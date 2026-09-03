import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../features/player/playerSlice";
import { streamSong } from "../services/song.service";
import type { RootState } from "../store/store";
import { Heart } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLikedSongs, likeSong, unlikeSong } from "../services/like.service"
import { toast } from "react-toastify";

interface Props {
  song: any;
}

const SongCard = ({ song }: Props) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data: likedSongs = [] } = useQuery({
    queryKey: ["likedSongs"],
    queryFn: getLikedSongs,
  });


  const isLiked = likedSongs.some(
    (like: any) => like.song.id === song.id
  );

  const likeMutation = useMutation({
    mutationFn: () => likeSong(song.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likedSongs"],
      });
      toast.success("Song liked successfully.");
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unlikeSong(song.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likedSongs"],
      });
      toast.success("Song unliked successfully.");
    },
  });

  const handleLike = (
    e: React.MouseEvent
  ) => {
    e.stopPropagation();

    if (isLiked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  const currentSong = useSelector(
    (state: RootState) => state.player.currentSong
  );

  const isCurrentSong = currentSong?.id === song.id;

  // const handlePlay = () => {
  //   dispatch(setCurrentSong(song));
  // };

  const handlePlaySong = async () => {
    try {
      const streamedSong = await streamSong(song.id);

      dispatch(setCurrentSong(streamedSong));
    } catch (error) {
      console.error("Failed to stream song:", error);
    }
  };

  return (
    <div
      // onClick={handlePlay}
      onClick={handlePlaySong}
      className={`group relative rounded-xl p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:scale-[1.03] bg-[#181818] hover:bg-[#242424] ${isCurrentSong ? "ring-2 ring-green-500" : ""
        }`}
    >

      <div className="relative">

        <img
          src={song.coverImage || "https://via.placeholder.com/300"}
          className="w-full h-40 sm:h-[180px] md:h-[200px] object-cover rounded-lg"
        />

        {/* <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-lg">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            
          </div>
        </div> */}
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-semibold text-sm sm:text-base truncate">
            {song.title}
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm truncate">
            {song.artist}
          </p>
        </div>
        <button
          onClick={handleLike}
          className="absolute right-2 sm:right-3 bottom-3 sm:bottom-4 z-20 bg-black/60 rounded-full p-2 hover:bg-black cursor-pointer"
        >
          <Heart
            size={18}
            className={`w-4 h-4 sm:w-5 sm:h-5 transition ${isLiked
                ? "fill-green-500 text-green-500"
                : "text-white"
              }`}
          />
        </button>
      </div>

    </div>
  );
};

export default SongCard;