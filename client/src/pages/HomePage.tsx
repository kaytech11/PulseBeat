import { useQuery } from "@tanstack/react-query";


import SongCard from "../components/SongCard";

import { getSongs } from "../services/song.service";
import { useDispatch } from "react-redux";
import { setPlaylist } from "../features/player/playerSlice";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useDispatch();
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });
  
  useEffect(() => {
    if (data.length > 0) {
      dispatch(setPlaylist(data));
    }
  }, [data, dispatch]);
  
  return (
    
      <div className="space-y-8">

        {/* Hero section (Spotify style greeting) */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Good afternoon
          </h1>
          <p className="text-gray-400 mt-1">
            Trending songs picked for you
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-48 bg-[#1a1a1a] rounded-lg animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <p className="text-red-400">
            Failed to load songs
          </p>
        )}

        {/* Songs section */}
        {!isLoading && !isError && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Trending Songs
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {data.map((song: any) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        )}

      </div>
    
  );
};

export default HomePage;