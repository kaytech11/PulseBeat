import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Music2, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getPlaylists, createPlaylist } from "../services/playlist.service";

const PlaylistsPage = () => {
  const {
    data: playlists = [],
    isLoading,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: () =>
      createPlaylist(name, description),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists"],
      });

      toast.success("Playlist created");

      setName("");
      setDescription("");

      setShowModal(false);
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
        "Failed to create playlist"
      );
    },
  });

  return (
    <div className="space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            My Playlists
          </h1>

          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Your personal playlists
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-semibold">
          <Plus size={18} />
          New Playlist
        </button>

      </div>

      {isLoading && (
        <p>Loading playlists...</p>
      )}

      {!isLoading && playlists.length === 0 && (
        <div className="text-center py-16 sm:py-24 text-gray-500">
          <Music2
            size={60}
            className="mx-auto mb-5"
          />

          <h2 className="text-xl sm:text-2xl font-semibold">
            No playlists yet
          </h2>

          <p className="mt-2">
            Create your first playlist.
          </p>
        </div>
      )}

      <div className="space-y-3">

        {playlists.map((playlist: any) => (
          <Link
            key={playlist.id}
            to={`/playlists/${playlist.id}`}
            className="flex items-center justify-between gap-4 bg-[#181818] hover:bg-[#242424] rounded-xl p-4 transition"
          >

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-lg bg-green-500 flex items-center justify-center">
                <Music2
                  size={26}
                  className="text-black"
                />
              </div>

              <div className="min-w-0">
                <h2 className="font-semibold text-base sm:text-lg truncate">
                  {playlist.name}
                </h2>

                <p className="text-gray-400 text-sm">
                  {playlist.songs.length} songs
                </p>
              </div>

            </div>

            <ChevronRight />

          </Link>
        ))}

      </div>

      {showModal && (
  <>
    <div
      onClick={() => setShowModal(false)}
      className="fixed inset-0 bg-black/60 z-40"
    />

    <div className="fixed bottom-0 left-0 right-0 bg-[#181818] rounded-t-3xl p-6 z-50">

      <h2 className="text-2xl font-bold mb-5">
        Create Playlist
      </h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Playlist name"
        className="w-full bg-[#242424] rounded-lg p-3 mb-4 outline-none"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="w-full bg-[#242424] rounded-lg p-3 mb-5 outline-none"
      />

      <button
        disabled={
          !name.trim() ||
          createMutation.isPending
        }
        onClick={() => createMutation.mutate()}
        className="w-full bg-green-500 text-black font-semibold py-3 rounded-lg disabled:opacity-50"
      >
        {createMutation.isPending
          ? "Creating..."
          : "Create Playlist"}
      </button>

    </div>
  </>
)}

    </div>
  );
};

export default PlaylistsPage;

