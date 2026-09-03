import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient, } from "@tanstack/react-query";
import { ArrowLeft, Music2, MoreHorizontal, } from "lucide-react";
import { getPlaylists, deletePlaylist } from "../services/playlist.service";
import PlaylistSongRow from "../components/playlistSongRow";
import PlaylistOptionsModal from "../components/playlistOptionsModal";
import AddSongsModal from "../components/AddSongsModal";
import { addSongToPlaylist } from "../services/playlist.service";
import RenamePlaylistModal from "../components/RenamePlaylistModal";
import { toast } from "react-toastify";

const PlaylistDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [addSongsOpen, setAddSongsOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: playlists = [],
    isLoading,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });

  const playlist = useMemo(() => {
    return playlists.find((p: any) => p.id === id);
  }, [playlists, id]);


  const deleteMutation = useMutation({
    mutationFn: () => deletePlaylist(playlist!.id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists"],
      });

      toast.success("Playlist deleted successfully.");

      navigate("/playlists");
    },

    onError: (error) => {
      console.log(error);
      toast.error("Failed to delete playlist.");
    },
  });

  const addSongMutation = useMutation({
    mutationFn: (songId: string) =>
      addSongToPlaylist(playlist.id, songId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists"],
      });

      queryClient.invalidateQueries({
        queryKey: ["likedSongs"],
      });

      toast.success("Song added to playlist.");

      setAddSongsOpen(false);
    },

    onError: (error) => {
      console.log(error);
      toast.error("Failed to add song.");
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        Loading playlist...
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="p-6">
        Playlist not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
          <Music2
            size={50}
            className="sm:w-[70px] sm:h-[70px] text-black"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="uppercase text-sm text-gray-400">
                Playlist
              </p>

              <h1 className="text-3xl font-bold sm:text-5xl break-words">
                {playlist.name}
              </h1>

              <p className="text-gray-400 mt-2 sm:mt-3 text-sm sm:text-base">
                {playlist.songs.length} songs
              </p>
            </div>

            <button
              onClick={() => setOptionsOpen(true)}
              className="p-2 rounded-full hover:bg-[#282828]"
            >
              <MoreHorizontal size={24} />
            </button>
          </div>
        </div>
      </div>

      {playlist.songs.length === 0 ? (
        <div className="text-center py-16 sm:py-20 text-gray-500">
          <Music2
            size={60}
            className="mx-auto mb-4"
          />

          <h2 className="text-xl sm:text-2xl font-semibold">
            No songs yet
          </h2>

          <p className="mt-2">
            Add songs from your Library.
          </p>
        </div>
      ) : (
        <div className="space-y-2 overflow-hidden ">
          {playlist.songs.map((item: any) => (
            <PlaylistSongRow
              key={item.song.id}
              song={item.song}
              playlistId={playlist.id}
            />
          ))}
        </div>
      )}

      <PlaylistOptionsModal
        open={optionsOpen}
        onClose={() => setOptionsOpen(false)}
        // onAddSongs={() => {
        //   setOptionsOpen(false);
        //   console.log("Open Add Songs Modal");
        // }}
        onAddSongs={() => {
          setOptionsOpen(false);
          setAddSongsOpen(true);
        }}
        // onRename={() => {
        //   setOptionsOpen(false);
        //   console.log("Open Rename Playlist Modal");
        // }}
        onRename={() => {
          setOptionsOpen(false);
          setRenameOpen(true);
        }}
        onDelete={() => {
          setOptionsOpen(false);
          deleteMutation.mutate();
        }}
      />

      <AddSongsModal
        open={addSongsOpen}
        onClose={() => setAddSongsOpen(false)}
        playlist={playlist}
        onAddSong={(songId) => addSongMutation.mutate(songId)}
      />

      <RenamePlaylistModal
        open={renameOpen}
        onClose={() => setRenameOpen(false)}
        playlist={playlist}
      />
    </div>
  );
};

export default PlaylistDetailsPage;