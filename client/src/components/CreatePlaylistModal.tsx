import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  createPlaylist,
  addSongToPlaylist,
} from "../services/playlist.service";

interface Props {
  open: boolean;
  onClose: () => void;
  songId: string;
}

const CreatePlaylistModal = ({
  open,
  onClose,
  songId,
}: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async () => {
      // console.log("Creating playlist...");

      const playlist = await createPlaylist(name, description);

      console.log("Playlist created:", playlist);

      console.log("Adding song:", songId);

      await addSongToPlaylist(playlist.id, songId);

      // console.log("Song added successfully");

      return playlist;
    },

    onSuccess: (playlist) => {
      queryClient.invalidateQueries({
        queryKey: ["playlists"],
      });

      setName("");
      setDescription("");

      // alert(`Added to "${playlist.name}"`);
      toast.success(`Added to "${playlist.name}"`);

      onClose();
    },

    // onError: (error) => {
    //   console.log(error);
    //   alert("Failed to create playlist");
    // },
    onError: (error: any) => {
      console.log(error);
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
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
          Create Playlist
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
          placeholder="Description (optional)"
          className="w-full bg-[#242424] rounded-lg p-3 text-sm sm:text-base mb-5 sm:mb-6 outline-none resize-none min-h-[100px]"
        />

        <button
          disabled={
            !name.trim() || createMutation.isPending
          }
          onClick={() => createMutation.mutate()}
          className="w-full bg-green-500 text-black font-semibold py-3 text-sm sm:text-base rounded-lg disabled:opacity-50"
        >
          {createMutation.isPending
            ? "Creating..."
            : "Create Playlist"}
        </button>

      </div>
    </>
  );
};

export default CreatePlaylistModal;