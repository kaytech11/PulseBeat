import {  Heart, ListMusic } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onUnlike: () => void;
  onAddToPlaylist: () => void;
  onFollowArtist: () => void;
  isFollowing: boolean;
}

const SongOptionsModal = ({
  open,
  onClose,
  onUnlike,
  onAddToPlaylist,
  onFollowArtist,
  isFollowing
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

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#181818] rounded-t-3xl p-5 sm:p-6 animate-slide-up max-h-[85vh] overflow-y-auto">

        <div className="w-14 h-1 bg-gray-500 rounded-full mx-auto mb-5 sm:mb-6" />

        <button
          onClick={onUnlike}
          className="w-full flex items-center gap-3 sm:gap-4 py-3 sm:py-4 text-left hover:bg-[#242424] rounded-lg px-3 text-sm sm:text-base"
        >
          <Heart
            size={22}
         className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-red-500 fill-red-500" 
          />

          <span>Unlike Song</span>
        </button>

        <button
          onClick={onAddToPlaylist}
          className="w-full flex items-center gap-3 sm:gap-4 py-3 sm:py-4 text-left hover:bg-[#242424] rounded-lg px-3 text-sm sm:text-base"
        >
          <ListMusic size={22}
           className="w-5 h-5 sm:w-[22px] sm:h-[22px]" /> 

          <span>Add to Playlist</span>
        </button>

        <button
          onClick={onFollowArtist}
          className="w-full text-left px-3 sm:px-4 py-3 text-sm sm:text-base hover:bg-[#282828] rounded-lg transition"
        >
          {isFollowing ? "Unfollow Artist" : "Follow Artist"}
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

export default SongOptionsModal;
