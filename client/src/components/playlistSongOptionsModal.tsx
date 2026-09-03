import { Trash2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onRemove: () => void;
}

const PlaylistSongOptionsModal = ({
  open,
  onClose,
  onRemove,
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
          onClick={onRemove}
         className="w-full flex items-center gap-3 sm:gap-4 py-3 sm:py-4 px-3 rounded-lg hover:bg-[#242424] text-sm sm:text-base"
        >
          <Trash2
            size={22}
            className="text-red-500"
          />

          Remove from Playlist
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

export default PlaylistSongOptionsModal;