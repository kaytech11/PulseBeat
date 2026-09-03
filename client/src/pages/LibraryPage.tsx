import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LikedSongRow from "../components/LikedSongRow";
import { getLikedSongs } from "../services/like.service";
const LibraryPage = () => {
  const {
    data: likedSongs = [],
    isLoading,
  } = useQuery({
    queryKey: ["likedSongs"],
    queryFn: getLikedSongs,
  });
  
  const [sortBy, setSortBy] = useState("recent");

  const sortedSongs = useMemo(() => {
    const songs = [...likedSongs];

    if (sortBy === "alphabetical") {
      return songs.sort((a: any, b: any) =>
        a.song.title.localeCompare(b.song.title)
      );
    }

    return songs.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  }, [likedSongs, sortBy]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl sm:text-4xl font-bold">
          Your Library
        </h1>

        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Your liked songs
        </p>
      </div>

      {!isLoading && likedSongs.length > 0 && (
        <div className="flex justify-end sm:justify-end">

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto bg-[#1DB954] border border-[#333] rounded-lg px-4 py-2 text-white outline-none"
          >
            <option value="recent">
              Recently Added
            </option>

            <option value="alphabetical">
              Alphabetical
            </option>
          </select>
        </div>
      )}

      {isLoading && (
        <p className="text-gray-400">
          Loading...
        </p>
      )}

      {!isLoading && likedSongs.length === 0 && (
        <div className="text-center py-24 sm:py-24 text-gray-500">
          <h2 className="text-xl sm:text-2xl font-semibold">
            No liked songs yet
          </h2>

          <p className="mt-2">
            Tap the ❤️ on any song to add it here.
          </p>
        </div>
      )}

      <div className="mt-10 sm:mt-10">
  <h2 className="text-xl sm:text-2xl font-bold mb-4">
    Your Playlists
  </h2>

  
</div>

      <div className="space-y-2">
        {sortedSongs.map((like: any) => (
          <LikedSongRow
            key={like.song.id}
            song={like.song}
          />
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;

