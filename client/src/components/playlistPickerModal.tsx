import {  Plus } from "lucide-react";

interface Props {
  open: boolean;
  playlists: any[];
  onClose: () => void;
  onSelect: (playlistId: string) => void;
  onCreatePlaylist: () => void;
}

const PlaylistPickerModal = ({
  open,
  playlists,
  onClose,
  onSelect,
  onCreatePlaylist,
}: Props) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-50"
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#181818] rounded-t-3xl p-5 sm:p-6 z-[60] animate-slide-up max-h-[85vh] overflow-y-auto">

        <div className="w-14 h-1 rounded-full bg-gray-500 mx-auto mb-5 sm:mb-6" />

        <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
          Add to Playlist
        </h2>

        <div className="space-y-2 max-h-[45vh] sm:max-h-[350px] overflow-y-auto">

          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => onSelect(playlist.id)}
              className="w-full text-left p-3 sm:p-4 rounded-lg hover:bg-[#242424] text-sm sm:text-base"
            >
              {playlist.name}
            </button>
          ))}

          <button
            onClick={onCreatePlaylist}
            className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-lg hover:bg-[#242424] text-sm sm:text-base"
          >
            <Plus size={20} />

            Create Playlist
          </button>

        </div>

        <button
          onClick={onClose}
          className="mt-5 sm:mt-6 w-full py-3 text-sm sm:text-base rounded-xl bg-[#282828] hover:bg-[#333]"
        >
          Cancel
        </button>

      </div>
    </>
  );
};

export default PlaylistPickerModal;