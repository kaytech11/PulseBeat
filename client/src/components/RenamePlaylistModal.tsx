import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePlaylist } from "../services/playlist.service";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onClose: () => void;
  playlist: any;
}

const RenamePlaylistModal = ({
  open,
  onClose,
  playlist,
}: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (playlist) {
      setName(playlist.name);
      setDescription(playlist.description || "");
    }
  }, [playlist]);

  const renameMutation = useMutation({
    mutationFn: () =>
      updatePlaylist(
        playlist.id,
        name,
        description
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists"],
      });
      toast.success("Playlist renamed successfully.");
      onClose();
    },

    onError: (error) => {
      console.log(error);
      toast.error("Failed to rename playlist");
    },
  });

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-40"
      />

      <div className="fixed bottom-0 left-0 right-0 bg-[#181818] rounded-t-3xl p-5 sm:p-6 z-50 max-h-[85vh] overflow-y-auto">

        <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
          Rename Playlist
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Playlist name"
          className="w-full bg-[#242424] rounded-lg p-3 text-sm sm:text-base mb-4 outline-none"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full bg-[#242424] rounded-lg p-3 text-sm sm:text-base mb-6 outline-none resize-none"
        />

        <button
          disabled={!name.trim() || renameMutation.isPending}
          onClick={() => renameMutation.mutate()}
          className="w-full bg-green-500 text-black font-semibold text-sm sm:text-base py-3 rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          {renameMutation.isPending
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>
    </>
  );
};

export default RenamePlaylistModal;