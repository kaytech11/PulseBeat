import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { RootState } from "../store/store";
import { setCurrentSong } from "../features/player/playerSlice";
import { removeSongFromPlaylist } from "../services/playlist.service";
import PlaylistSongOptionsModal from "./playlistSongOptionsModal";
import { toast } from "react-toastify";

interface Props {
  song: any;
  playlistId: string;
}

const PlaylistSongRow = ({
  song,
  playlistId,
}: Props) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const currentSong = useSelector(
    (state: RootState) => state.player.currentSong
  );

  const isCurrent = currentSong?.id === song.id;

  const removeMutation = useMutation({
    mutationFn: () =>
      removeSongFromPlaylist(
        playlistId,
        song.id
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists"],
      });
      toast.success("Song removed from playlist.");
      setOpen(false);
    },
  });

  return (
    <>
      <div
        className={`flex items-center gap-3 sm:gap-4 p-3 rounded-lg transition
       ${isCurrent
            ? "bg-[#282828]"
            : "hover:bg-[#1f1f1f]"
          }`}
      >
        <div
          onClick={() => dispatch(setCurrentSong(song))}
          className="flex flex-1 items-center gap-3 sm:gap-4 cursor-pointer min-w-0"
        >
          <img
            src={song.coverImage}
            alt={song.title}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded object-cover flex-shrink-0"
          />

          <div className="min-w-0 flex-1">
            <h3
              className={`font-semibold text-sm sm:text-base truncate ${isCurrent
                  ? "text-green-500"
                  : "text-white"
                }`}
            >
              {song.title}
            </h3>

            <p className="text-gray-400 text-xs sm:text-sm truncate">
              {song.artist}
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
         className="p-2 hover:bg-[#333] rounded-full flex-shrink-0"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      <PlaylistSongOptionsModal
        open={open}
        onClose={() => setOpen(false)}
        onRemove={() => removeMutation.mutate()}
      />
    </>
  );
};

export default PlaylistSongRow;