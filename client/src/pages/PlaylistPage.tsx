import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Music2, ChevronRight, Plus } from "lucide-react";

import { getPlaylists } from "../services/playlist.service";

const PlaylistsPage = () => {
  const {
    data: playlists = [],
    isLoading,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            My Playlists
          </h1>

          <p className="text-gray-400 mt-2">
            Your personal playlists
          </p>
        </div>

        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-semibold">
          <Plus size={18} />
          New Playlist
        </button>

      </div>

      {isLoading && (
        <p>Loading playlists...</p>
      )}

      {!isLoading && playlists.length === 0 && (
        <div className="text-center py-24 text-gray-500">
          <Music2
            size={60}
            className="mx-auto mb-5"
          />

          <h2 className="text-2xl font-semibold">
            No playlists yet
          </h2>

          <p className="mt-2">
            Create your first playlist.
          </p>
        </div>
      )}

      <div className="space-y-3">

        {playlists.map((playlist: any) => (
          <Link
            key={playlist.id}
            to={`/playlists/${playlist.id}`}
            className="flex items-center justify-between bg-[#181818] hover:bg-[#242424] rounded-xl p-4 transition"
          >

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-lg bg-green-500 flex items-center justify-center">
                <Music2
                  size={26}
                  className="text-black"
                />
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  {playlist.name}
                </h2>

                <p className="text-gray-400">
                  {playlist.songs.length} songs
                </p>
              </div>

            </div>

            <ChevronRight />

          </Link>
        ))}

      </div>

    </div>
  );
};

export default PlaylistsPage;

