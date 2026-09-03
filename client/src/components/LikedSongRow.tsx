import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import type { RootState } from "../store/store";
import { setCurrentSong } from "../features/player/playerSlice";
import { streamSong } from "../services/song.service";
import { unlikeSong } from "../services/like.service";
import SongOptionsModal from "./SongOptionalModal";
import PlaylistPickerModal from "./playlistPickerModal";
import { getPlaylists, addSongToPlaylist, } from "../services/playlist.service";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { getFollowedArtists, followArtist, unfollowArtist } from "../services/follow.service";
import { toast } from "react-toastify";

interface Props {
  song: any;
}

const LikedSongRow = ({ song }: Props) => {
  // console.log(song);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [createPlaylistOpen, setCreatePlaylistOpen] = useState(false);

  const { data: playlists = [] } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });

  const { data: followedArtists = [] } = useQuery({
    queryKey: ["followedArtists"],
    queryFn: getFollowedArtists,
  });

  const isFollowing = followedArtists.some(
    (follow: any) => follow.artist.id === song.userId
  );
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
      toast.success("Song unliked successfully.");
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
      toast.success("Song added to playlist.");
    },
  });

  const followMutation = useMutation({
    mutationFn: () => {
      if (isFollowing) {
        return unfollowArtist(song.userId);
      }

      return followArtist(song.userId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["followedArtists"],
      });
      toast.success(isFollowing
        ? "Unfollowed artist successfully."
        : "Followed artist successfully."
      );
      setOpen(false);
    },
  });

  const handlePlaySong = async () => {
    try {
      const streamedSong = await streamSong(song.id);

      dispatch(setCurrentSong(streamedSong));
    } catch (error) {
      console.error("Failed to stream song:", error);
    }
  };


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
          // onClick={() => dispatch(setCurrentSong(song))}
          onClick={handlePlaySong}
          className="flex flex-1 items-center gap-3 sm:gap-4 cursor-pointer min-w-0"
        >
          <img
            src={song.coverImage}
            alt={song.title}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded object-cover flex-shrink-0"
          />

          <div className="min-w-0 flex-1">
            <h3
              className={`font-semibold text-sm sm:text-base  truncate ${isCurrent
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
       className="p-2 rounded-full hover:bg-[#333] flex-shrink-0"
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
        onFollowArtist={() => followMutation.mutate()}
        isFollowing={isFollowing}
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
        songId={song.id}
      />
    </>
  );
};

export default LikedSongRow;