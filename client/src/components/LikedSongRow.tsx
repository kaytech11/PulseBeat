import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import type { RootState } from "../store/store";
import { setCurrentSong } from "../features/player/playerSlice";
import { unlikeSong } from "../services/like.service";
import SongOptionsModal from "./SongOptionalModal";
import PlaylistPickerModal from "./playlistPickerModal";
import { getPlaylists, addSongToPlaylist, } from "../services/playlist.service";
import CreatePlaylistModal from "./CreatePlaylistModal";

interface Props {
  song: any;
}

const LikedSongRow = ({ song }: Props) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [createPlaylistOpen, setCreatePlaylistOpen] = useState(false);

  const { data: playlists = [] } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });

  const currentSong = useSelector(
    (state: RootState) => state.player.currentSong
  );

  const isCurrent = currentSong?.id === song.id;

  const unlikeMutation = useMutation({
    mutationFn: () => unlikeSong(song.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likedSongs"],
      });

      setOpen(false);
    },
  });

  const addMutation = useMutation({
    mutationFn: ({
      playlistId,
      songId,
    }: {
      playlistId: string;
      songId: string;
    }) =>
      addSongToPlaylist(
        playlistId,
        songId
      ),

    onSuccess: () => {
      setPlaylistOpen(false);
    },
  });

  return (
    <>
      <div
        className={`flex items-center gap-4 p-3 rounded-lg transition
        ${isCurrent
            ? "bg-[#282828]"
            : "hover:bg-[#1f1f1f]"
          }`}
      >
        <div
          onClick={() => dispatch(setCurrentSong(song))}
          className="flex flex-1 items-center gap-4 cursor-pointer"
        >
          <img
            src={song.coverImage}
            alt={song.title}
            className="w-14 h-14 rounded object-cover"
          />

          <div className="min-w-0">
            <h3
              className={`font-semibold truncate ${isCurrent
                ? "text-green-500"
                : "text-white"
                }`}
            >
              {song.title}
            </h3>

            <p className="text-gray-400 text-sm truncate">
              {song.artist}
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-full hover:bg-[#333]"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      <SongOptionsModal
        open={open}
        onClose={() => setOpen(false)}
        onUnlike={() => unlikeMutation.mutate()}
        onAddToPlaylist={() => {
          setOpen(false);
          setPlaylistOpen(true);
        }}
      />

      <PlaylistPickerModal
        open={playlistOpen}
        playlists={playlists}
        onClose={() => setPlaylistOpen(false)}
        onCreatePlaylist={() => {
          setPlaylistOpen(false);
          setCreatePlaylistOpen(true);
        }}
        onSelect={(playlistId) =>
          addMutation.mutate({
            playlistId,
            songId: song.id,
          })
        }
      />

      <CreatePlaylistModal
        open={createPlaylistOpen}
        onClose={() => setCreatePlaylistOpen(false)}
      />
    </>
  );
};

export default LikedSongRow;