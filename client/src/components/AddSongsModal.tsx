import { useMemo } from "react";
import { X, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { getLikedSongs } from "../services/like.service";

interface Props {
  open: boolean;
  onClose: () => void;
  playlist: any;
  onAddSong: (songId: string) => void;
}

const AddSongsModal = ({
  open,
  onClose,
  playlist,
  onAddSong,
}: Props) => {
  const { data: likedSongs = [] } = useQuery({
    queryKey: ["likedSongs"],
    queryFn: getLikedSongs,
  });

  const availableSongs = useMemo(() => {
    const existingIds = new Set(
      playlist.songs.map((item: any) => item.song.id)
    );

    return likedSongs.filter(
      (like: any) => !existingIds.has(like.song.id)
    );
  }, [likedSongs, playlist]);

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-40"
      />

      {/* <div className="fixed bottom-0 left-0 right-0 bg-[#181818] rounded-t-3xl p-6 z-50 max-h-[80vh] overflow-y-auto"> */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#181818] rounded-t-3xl p-4 sm:p-6 z-50 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-xl sm:text-2xl font-bold">
            Add Songs
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        {availableSongs.length === 0 ? (
          <p className="text-gray-400 text-center sm:text-left">
            All your liked songs are already in this playlist.
          </p>
        ) : (
          <div className="space-y-3">

            {availableSongs.map((like: any) => (
              <div
                key={like.song.id}
               className="flex items-center justify-between gap-3 bg-[#242424] rounded-lg p-3"
              >
       <div className="flex items-center gap-3 flex-1 min-w-0">

                  <img
                    src={like.song.coverImage}
                    alt={like.song.title}
                   className="w-12 h-12 sm:w-14 sm:h-14 rounded object-cover flex-shrink-0"
                  />

                  <div>
                    <h3 className="font-medium truncate">
                      {like.song.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-400 truncate">
                      {like.song.artist}
                    </p>
                  </div>

                </div>

                <button
                  onClick={() => onAddSong(like.song.id)}
                  className="bg-green-500 text-black rounded-full p-2 hover:bg-green-600 flex-shrink-0"
                >
                  <Plus size={18} />
                </button>
              </div>
            ))}

          </div>
        )}

      </div>
    </>
  );
};

export default AddSongsModal;