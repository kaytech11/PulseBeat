import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Music2 } from "lucide-react";

import { getPlaylists } from "../services/playlist.service";
import LikedSongRow from "../components/LikedSongRow";

const PlaylistDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: playlists = [],
    isLoading,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });

  const playlist = useMemo(() => {
    return playlists.find((p: any) => p.id === id);
  }, [playlists, id]);

  if (isLoading) {
    return (
      <div className="p-6">
        Loading playlist...
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="p-6">
        Playlist not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="flex items-center gap-6">

        <div className="w-40 h-40 rounded-xl bg-green-500 flex items-center justify-center">
          <Music2
            size={70}
            className="text-black"
          />
        </div>

        <div>

          <p className="uppercase text-sm text-gray-400">
            Playlist
          </p>

          <h1 className="text-5xl font-bold">
            {playlist.name}
          </h1>

          <p className="text-gray-400 mt-3">
            {playlist.songs.length} songs
          </p>

        </div>

      </div>

      {playlist.songs.length === 0 ? (
        <div className="text-center py-20 text-gray-500">

          <Music2
            size={60}
            className="mx-auto mb-4"
          />

          <h2 className="text-2xl font-semibold">
            No songs yet
          </h2>

          <p className="mt-2">
            Add songs from your Library.
          </p>

        </div>
      ) : (
        <div className="space-y-2">

          {playlist.songs.map((item: any) => (
            <LikedSongRow
              key={item.song.id}
              song={item.song}
            />
          ))}

        </div>
      )}

    </div>
  );
};

export default PlaylistDetailsPage;