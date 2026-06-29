import { X, Heart, ListMusic } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onUnlike: () => void;
  onAddToPlaylist: () => void;
}

const SongOptionsModal = ({
  open,
  onClose,
  onUnlike,
  onAddToPlaylist,
}: Props) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-40"
      />

      {/* Bottom Sheet */}

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#181818] rounded-t-3xl p-6 animate-slide-up">

        <div className="w-14 h-1 bg-gray-500 rounded-full mx-auto mb-6" />

        <button
          onClick={onUnlike}
          className="w-full flex items-center gap-4 py-4 text-left hover:bg-[#242424] rounded-lg px-3"
        >
          <Heart
            size={22}
            className="text-red-500 fill-red-500"
          />

          <span>Unlike Song</span>
        </button>

        <button
          onClick={onAddToPlaylist}
          className="w-full flex items-center gap-4 py-4 text-left hover:bg-[#242424] rounded-lg px-3"
        >
          <ListMusic size={22} />

          <span>Add to Playlist</span>
        </button>

        <button
          onClick={onClose}
          className="w-full mt-5 py-3 rounded-xl bg-[#282828] hover:bg-[#333]"
        >
          Cancel
        </button>

      </div>
    </>
  );
};

export default SongOptionsModal;
