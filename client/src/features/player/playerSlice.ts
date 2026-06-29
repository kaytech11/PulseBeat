import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Song {
    id: string;
    title: string;
    artist: string;
    audioUrl: string;
    coverImage?: string;
}

type RepeatMode = "off" | "one" | "all";


interface PlayerState {
    currentSong: Song | null;
    playlist: Song[];
    currentIndex: number;
    isPlaying: boolean;
    repeatMode: RepeatMode;
    shuffle:boolean;
}

const initialState: PlayerState = {
    currentSong: null,
    playlist: [],
    currentIndex: -1,
    isPlaying: false,
    repeatMode: "off",
    shuffle:false,
};

const playerSlice = createSlice({
    name: 'player',


    initialState,

    reducers: {
        setPlaylist: (
            state,
            action: PayloadAction<Song[]>
        ) => {
            state.playlist = action.payload;
        },
        setCurrentSong: (
            state,
            action: PayloadAction<Song>
        ) => {
            state.currentSong = action.payload;

            state.currentIndex = state.playlist.findIndex(
                (song) => song.id === action.payload.id
            );

            state.isPlaying = true;
        },
        previousSong: (state) => {
            if (state.playlist.length === 0) return;

            const previousIndex =
                state.currentIndex === 0
                    ? state.playlist.length - 1
                    : state.currentIndex - 1;

            state.currentIndex = previousIndex;
            state.currentSong = state.playlist[previousIndex];
            state.isPlaying = true;
        },
        nextSong: (state) => {
            if (state.playlist.length === 0) return;

            const nextIndex =
                (state.currentIndex + 1) % state.playlist.length;

            state.currentIndex = nextIndex;
            state.currentSong = state.playlist[nextIndex];
            state.isPlaying = true;
        },
        stopPlayer: (state) => {
            state.isPlaying = false;
        },

        togglePlay: (state) => {
            state.isPlaying = !state.isPlaying;
        },

        cycleRepeatMode: (state) => {
            if (state.repeatMode === "off") {
                state.repeatMode = "one";
            } else if (state.repeatMode === "one") {
                state.repeatMode = "all";
            } else {
                state.repeatMode = "off";
            }
        },
        toggleShuffle: (state) => {
            state.shuffle = !state.shuffle;
        },
    },
});

export const { setPlaylist, setCurrentSong, previousSong, nextSong, stopPlayer,
     togglePlay, cycleRepeatMode,toggleShuffle } = playerSlice.actions;
export default playerSlice.reducer;