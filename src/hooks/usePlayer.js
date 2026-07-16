import { useRef, useState, useEffect, useCallback } from "react";
import { allSongs, DEFAULT_COVER } from "../data/songs";

const PREVIEW_LIMIT_SECONDS = 20;

export function usePlayer({ isLoggedIn, onPreviewEnd }) {
    const audioRef = useRef(new Audio());
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    const currentSong = currentIndex > -1 ? allSongs[currentIndex] : null;

    const findPlayableIndex = useCallback((startIndex, direction) => {
        if (!allSongs.length) return -1;
        let idx = startIndex;
        for (let attempts = 0; attempts < allSongs.length; attempts++) {
            idx = (idx + direction + allSongs.length) % allSongs.length;
            if (allSongs[idx].src) return idx;
        }
        return -1;
    }, []);

    const playIndex = useCallback((index) => {
        const song = allSongs[index];
        if (!song || !song.src) {
            console.warn("No audio file set for this track yet:", song?.title);
            return;
        }
        const audio = audioRef.current;
        audio.src = encodeURI(song.src);
        setCurrentIndex(index);
        audio.play().catch((err) => console.warn("Playback failed:", err));
    }, []);

    const togglePlayPause = useCallback(() => {
        const audio = audioRef.current;
        if (currentIndex === -1) {
            const firstPlayable = allSongs.findIndex((s) => s.src);
            if (firstPlayable > -1) playIndex(firstPlayable);
            return;
        }
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch((err) => console.warn("Playback failed:", err));
        }
    }, [currentIndex, isPlaying, playIndex]);

    const playNext = useCallback(() => {
        const next = findPlayableIndex(currentIndex, 1);
        if (next > -1) playIndex(next);
    }, [currentIndex, findPlayableIndex, playIndex]);

    const playPrev = useCallback(() => {
        const prev = findPlayableIndex(currentIndex, -1);
        if (prev > -1) playIndex(prev);
    }, [currentIndex, findPlayableIndex, playIndex]);

    const seekTo = useCallback((percent) => {
        const audio = audioRef.current;
        if (audio.duration) {
            audio.currentTime = (percent / 100) * audio.duration;
        }
    }, []);

    const changeVolume = useCallback((value) => {
        audioRef.current.volume = value;
        setVolume(value);
    }, []);

    useEffect(() => {
        const audio = audioRef.current;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration || 0);

            if (!isLoggedIn && audio.currentTime >= PREVIEW_LIMIT_SECONDS) {
                audio.pause();
                audio.currentTime = 0;
                if (onPreviewEnd) onPreviewEnd();
            }
        };
        const handleEnded = () => playNext();
        const handleError = () => {
            console.warn("Could not load audio file — check it exists at that exact path in your songs/ folder.");
            setIsPlaying(false);
        };

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("error", handleError);

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("error", handleError);
        };
    }, [isLoggedIn, playNext]);

    return {
        currentIndex,
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        playIndex,
        togglePlayPause,
        playNext,
        playPrev,
        seekTo,
        changeVolume,
        showPreviewBadge: !isLoggedIn && currentIndex > -1,
        coverSrc: currentSong?.cover || DEFAULT_COVER
    };
}

export function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
