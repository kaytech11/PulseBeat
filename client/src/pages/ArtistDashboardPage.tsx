import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Music2, Play, Heart, Users, Upload, } from "lucide-react";

import { getArtistDashboard } from "../services/dashbord.service";

const ArtistDashboardPage = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["artistDashboard"],
    queryFn: getArtistDashboard,
  });

  if (isLoading) {
    return (
      <div className="text-center py-20">
        Loading dashboard...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load dashboard.
      </div>
    );
  }

  const analytics = data.analytics;
  const songs = data.songs;

  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-4xl sm:text-4xl  font-bold">
            Artist Dashboard
          </h1>

          <p className="text-gray-400   mt-2 text-sm sm:text-base">
            Welcome back. Here's how your music is performing.
          </p>
        </div>

        <Link
          to="/upload"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold px-5 py-3 rounded-xl"
        >
          <Upload size={20} />
          Upload Song
        </Link>

      </div>

      {/* Analytics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-[#181818] rounded-xl p-6">
          <Music2 className="mb-4 text-green-500" />
          <p className="text-gray-400">
            Songs
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {analytics.totalSongs}
          </h2>
        </div>

        <div className="bg-[#181818] rounded-xl p-6">
          <Play className="mb-4 text-green-500" />
          <p className="text-gray-400">
            Total Plays
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {analytics.totalPlays}
          </h2>
        </div>

        <div className="bg-[#181818] rounded-xl p-6">
          <Heart className="mb-4 text-green-500" />
          <p className="text-gray-400">
            Likes
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {analytics.totalLikes}
          </h2>
        </div>

        <div className="bg-[#181818] rounded-xl p-6">
          <Users className="mb-4 text-green-500" />
          <p className="text-gray-400">
            Followers
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {analytics.followersCount}
          </h2>
        </div>

      </div>

      {/* Songs */}

      <div>

        <h2 className="text-2xl font-bold mb-5">
          My Songs
        </h2>

        {songs.length === 0 ? (
          <div className="bg-[#181818] rounded-xl p-6 sm:p-10 text-center">

            <Music2
              size={60}
              className="mx-auto mb-4 text-gray-500"
            />

            <h3 className="text-2xl sm:text-2xl font-semibold">
              No songs uploaded
            </h3>

            <p className="text-gray-400 mt-2">
              Upload your first song to start growing.
            </p>

          </div>
        ) : (
          <div className="space-y-3">

            {songs.map((song: any) => (

              <div
                key={song.id}
                className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-[#181818] hover:bg-[#222] rounded-xl p-4 transition"
              >

                <div className="flex items-center gap-4 min-w-0">

                  <img
                    src={song.coverImage}
                    alt={song.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <div>

                    <h3 className="font-semibold text-base sm:text-lg truncate">
                      {song.title}
                    </h3>

                    <p className="text-gray-400 truncate">
                      {song.artist}
                    </p>

                  </div>

                </div>

                <div className="flex justify-between sm:justify-end items-center gap-6 sm:gap-8 w-full sm:w-auto">

                  <div className="text-center">
                    <p className="text-gray-400 text-sm">
                      Plays
                    </p>

                    <p className="font-semibold">
                      {song.playCount}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm">
                      Likes
                    </p>

                    <p className="font-semibold">
                      {song.likes.length}
                    </p>
                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default ArtistDashboardPage;