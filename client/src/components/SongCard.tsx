

// export default SongCard;  
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../features/player/playerSlice";
import type { RootState } from "../store/store";
import { Heart } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLikedSongs, likeSong, unlikeSong } from "../services/like.service"

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
    },
  });




  const unlikeMutation = useMutation({
    mutationFn: () => unlikeSong(song.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likedSongs"],
      });
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

  const handlePlay = () => {
    dispatch(setCurrentSong(song));
  };

  return (
    <div
      onClick={handlePlay}
      className={`group relative rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.03] bg-[#181818] hover:bg-[#242424] ${isCurrentSong ? "ring-2 ring-green-500" : ""
        }`}
    >

      <div className="relative">

        <img
          src={song.coverImage || "https://via.placeholder.com/300"}
          className="w-full h-[180px] object-cover rounded-lg"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-lg">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            ▶
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-row">
        <div className="">
          <h2 className="text-white font-semibold truncate">
            {song.title}
          </h2>
          <p className="text-gray-400 text-sm truncate">
            {song.artist}
          </p>
        </div>
          <button
        onClick={handleLike}
        className="absolute  right-3 bottom-4 z-20 bg-black/60 rounded-full p-2 hover:bg-black cursor-pointer"
      >
        <Heart
          size={20}
          className={`transition ${
            isLiked
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