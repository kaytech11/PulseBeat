import { useState } from "react";
import { uploadSong } from "../services/song.service";

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audio, setAudio] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!audio) {
      alert("Audio file is required");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("audio", audio);

      if (cover) {
        formData.append("cover", cover);
      }

      const data = await uploadSong(formData);

      console.log(data);

      alert("Song uploaded successfully");

      setTitle("");
      setArtist("");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 flex items-center justify-center">

      <div className="w-full max-w-md bg-[#181818] p-6 rounded-xl shadow-lg">

        <h1 className="text-2xl font-bold mb-6">
          Upload Song
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#242424] text-white placeholder-gray-400 px-4 py-2 rounded-md outline-none focus:bg-[#2a2a2a] transition"
          />

          <input
            type="text"
            placeholder="Artist Name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="bg-[#242424] text-white placeholder-gray-400 px-4 py-2 rounded-md outline-none focus:bg-[#2a2a2a] transition"
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">
              Audio File
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) =>
                setAudio(e.target.files?.[0] || null)
              }
              className="text-sm text-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setCover(e.target.files?.[0] || null)
              }
              className="text-sm text-gray-300"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold py-2 rounded-full transition cursor-pointer"
          >
            Upload Song
          </button>

        </form>

      </div>
    </div>
  );
};

export default UploadPage;