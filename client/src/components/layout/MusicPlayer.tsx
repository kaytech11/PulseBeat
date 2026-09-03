import { SkipBack, SkipForward, Play, Pause, Volume2, Shuffle, Repeat, Repeat1, } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setCurrentSong, togglePlay, nextSong, previousSong, cycleRepeatMode, stopPlayer, toggleShuffle, } from "../../features/player/playerSlice";



const MusicPlayer = () => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const { currentSong, isPlaying, repeatMode, currentIndex, playlist, shuffle } = useSelector(
    (state: RootState) => state.player
  );

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    }
  }, [currentSong]);

  useEffect(() => {
    console.log("MusicPlayer Mounted");

    return () => {
      console.log("MusicPlayer Unmounted");
    };
  }, []);


  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log(err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    setCurrentTime(0);
  }, [currentSong]);

  if (!currentSong) {
    return (
      <div className="h-[90px] bg-[#121212] border-t border-gray-800 flex items-center px-6 text-gray-400">
        No song selected
      </div>
    );
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSeek = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTime = Number(e.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }

    setCurrentTime(newTime);
  };

  const handleVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVolume = Number(e.target.value);

    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };


  const handleSongEnd = () => {
    if (!audioRef.current) return;

    // Repeat current song
    if (repeatMode === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }

    const isLastSong =
      currentIndex === playlist.length - 1;

    // Repeat entire playlist
    if (repeatMode === "all") {
      dispatch(nextSong());
      return;
    }

    // Stop when playlist ends
    if (repeatMode === "off" && isLastSong) {
      dispatch(stopPlayer());
      return;
    }

    if (shuffle) {
      const randomIndex = Math.floor(
        Math.random() * playlist.length
      );

      dispatch(setCurrentSong(playlist[randomIndex]));
      return;
    }


    dispatch(nextSong());
  };

  return (
    <div className="bg-[#181818] border-t border-[#282828] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 px-4 md:px-5 py-3 md:h-[100px]">
      <div className="flex items-center gap-3 w-full md:w-1/3">
        <img
          src={
            currentSong.coverImage ||
            "https://via.placeholder.com/300"
          }
          alt={currentSong.title}
          className="w-14 h-14 md:w-16 md:h-16 rounded shadow-lg object-cover"
        />
        <div className="min-w-0">
          <h3 className="truncate font-semibold">
            {currentSong.title}
          </h3>

          <p className="text-gray-400 text-sm truncate">
            {currentSong.artist}
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/3 flex flex-col items-center gap-3">


        <div className="flex items-center gap-3 md:gap-6 flex-wrap justify-center">

          <button
            onClick={() => dispatch(toggleShuffle())}
            className={`transition ${shuffle
              ? "text-[#1DB954]"
              : "text-gray-400 hover:text-white"
              }`}
          >
            <Shuffle size={20} />
          </button>

          <button
            onClick={() => dispatch(previousSong())}
            className="text-xl"
          >
            {/* ⏮ */}
            <SkipBack size={22} />
          </button>



          <button
            onClick={() => dispatch(togglePlay())}
            className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-100 transition"
          >
            {isPlaying ? (
              <Pause fill="black" size={20} />
            ) : (
              <Play fill="black" size={20} className="ml-0.5" />
            )}
          </button>

          <button
            // onClick={() => dispatch(nextSong())}
            onClick={() => {
              if (shuffle) {
                const randomIndex = Math.floor(
                  Math.random() * playlist.length
                );

                dispatch(
                  setCurrentSong(
                    playlist[randomIndex]
                  )
                );

                return;
              }

              dispatch(nextSong());
            }}
            className="text-xl"
          >
            {/* ⏭ */}
            <SkipForward size={22} />
          </button>

          {/* <button
            onClick={() => dispatch(cycleRepeatMode())}
            className="text-sm px-2 py-1 border rounded"
          >
            {repeatMode === "off" && "Repeat Off"}
            {repeatMode === "one" && "Repeat One"}
            {repeatMode === "all" && "Repeat All"}
          </button> */}

          <button
            onClick={() => dispatch(cycleRepeatMode())}
            className={`transition ${repeatMode === "off"
                ? "text-gray-400"
                : "text-[#1DB954]"
              }`}
          >
            {repeatMode === "one" ? (
              <Repeat1 size={20} />
            ) : (
              <Repeat size={20} />
            )}
          </button>

        </div>

        <div className="flex items-center gap-2 w-full max-w-xl">

          <span className="text-xs">
            {formatTime(currentTime)}
          </span>


          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1"
          />

          <span className="text-xs">
            {formatTime(duration)}
          </span>

        </div>
      </div>

      
      <div className="w-full md:w-1/3 flex justify-center md:justify-end items-center gap-2">

        {/* <span>🔊</span> */}
        <Volume2
          size={20}
          className="text-gray-300"
        />

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
         className="w-24 md:w-[120px]"
        />

      </div>

      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onEnded={handleSongEnd}
        onTimeUpdate={() =>
          setCurrentTime(audioRef.current?.currentTime || 0)
        }
        onLoadedMetadata={() =>
          setDuration(audioRef.current?.duration || 0)
        }
      />
    </div>
  );
};
export default MusicPlayer;