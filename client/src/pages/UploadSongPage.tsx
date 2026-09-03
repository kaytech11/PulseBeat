import { useState } from "react";
import { uploadSong } from "../services/song.service";
import { toast } from "react-toastify";

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audio, setAudio] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!audio) {
      // alert("Audio file is required");
      toast.error("Audio file is required");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("audio", audio);

      if (cover) {
        formData.append("cover", cover);
      }

      const data = await uploadSong(
        formData,
        (uploadprogress) => {
          const safeProgress = Math.min(uploadprogress, 95);

          setProgress(safeProgress);
        }
      );

      console.log(data);


      setProgress(100);

      // alert("Song uploaded successfully");
      toast.success("Song uploaded successfully");

      setTitle("");
      setArtist("");
      setAudio(null);
      setCover(null);

      setUploading(false);

      setTimeout(() => {
        setProgress(0);
      }, 500);
    } catch (error) {
      console.error(error);

      setUploading(false);
      setProgress(0);

      toast.error("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 flex items-center justify-center">

      <div className="w-full max-w-md bg-[#181818] p-6 rounded-xl shadow-lg">

        <h1 className="text-2xl font-bold mb-6">
          Upload Song
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

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

          {uploading && (
            <div className="space-y-2">

              <div className="flex justify-between text-sm text-gray-400">
                <span>  {progress >= 95 ? "Processing..." : "Uploading..."}</span>
                <span>{progress}%</span>
              </div>

              <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1DB954] transition-all duration-200"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="mt-2 bg-[#1DB954] hover:bg-[#1ed760] disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-2 rounded-full transition"
          >
            {uploading
              ? progress >= 99
                ? "Processing..."
                : `Uploading... ${progress}%`
              : "Upload Song"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default UploadPage;