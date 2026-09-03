import { Plus, Pencil, Trash2, } from "lucide-react";


interface Props {
  open: boolean;
  onClose: () => void;
  onAddSongs: () => void;
  onRename: () => void;
  onDelete: () => void;
}

const PlaylistOptionsModal = ({
  open,
  onClose,
  onAddSongs,
  onRename,
  onDelete,
}: Props) => {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-40"
      />

      <div className="fixed bottom-0 left-0 right-0 bg-[#181818] rounded-t-3xl p-5 sm:p-6 z-50 animate-slide-up max-h-[85vh] overflow-y-auto">

        <div className="w-16 h-1 bg-gray-500 rounded-full mx-auto mb-5 sm:mb-6" />

        <button
          onClick={onAddSongs}
          className="w-full flex items-center gap-3 sm:gap-4 py-3 sm:py-4 px-3 rounded-lg hover:bg-[#242424] text-sm sm:text-base"
        >
          <Plus size={22} />
          Add Songs
        </button>

        <button
          onClick={onRename}
            className="w-full flex items-center gap-3 sm:gap-4 py-3 sm:py-4 px-3 rounded-lg hover:bg-[#242424] text-sm sm:text-base"
          >
          <Pencil size={22} />
          Rename Playlist
        </button>

        <button
          onClick={onDelete}
          className="w-full flex items-center gap-3 sm:gap-4 py-3 sm:py-4 px-3 rounded-lg hover:bg-[#242424] text-sm sm:text-base"
        >
          <Trash2
            size={22}
            className="text-red-500"
          />

          <span className="text-red-500">
            Delete Playlist
          </span>
        </button>

        <button
          onClick={onClose}
          className="w-full mt-5 py-3 text-sm sm:text-base rounded-xl bg-[#282828] hover:bg-[#333]"
        >
          Cancel
        </button>

      </div>
    </>
  );
};

export default PlaylistOptionsModal;