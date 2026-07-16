import { formatTime } from "../hooks/usePlayer";
import { DEFAULT_COVER } from "../data/songs";

export default function MusicBar({
    currentSong,
    coverSrc,
    isPlaying,
    currentTime,
    duration,
    volume,
    showPreviewBadge,
    onTogglePlayPause,
    onNext,
    onPrev,
    onSeek,
    onVolumeChange
}) {
    const progressPct = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className="music-bar">
            <div className="song-info">
                <img
                    src={coverSrc}
                    width="56"
                    height="56"
                    alt=""
                    onError={(e) => {
                        if (e.currentTarget.src !== DEFAULT_COVER) {
                            e.currentTarget.src = DEFAULT_COVER;
                        }
                    }}
                />
                <div>
                    <h4>{currentSong ? currentSong.title : "No Song Selected"}</h4>
                    {showPreviewBadge && <span className="preview-badge">PREVIEW</span>}
                    <p>{currentSong ? currentSong.artist : "---"}</p>
                </div>
            </div>

            <div className="controls">
                <div className="control-buttons">
                    <i className="fa-solid fa-backward" onClick={onPrev}></i>
                    <i
                        className={`fa-solid play-pause-btn ${isPlaying ? "fa-pause" : "fa-play"}`}
                        onClick={onTogglePlayPause}
                    ></i>
                    <i className="fa-solid fa-forward" onClick={onNext}></i>
                </div>
                <div className="progress">
                    <span>{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progressPct}
                        style={{
                            background: `linear-gradient(to right, #1db954 0%, #1db954 ${progressPct}%, #4d4d4d ${progressPct}%, #4d4d4d 100%)`
                        }}
                        onChange={(e) => onSeek(Number(e.target.value))}
                    />
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="volume">
                <i className="fa-solid fa-volume-high"></i>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    style={{
                        background: `linear-gradient(to right, #fff 0%, #fff ${volume * 100}%, #4d4d4d ${volume * 100}%, #4d4d4d 100%)`
                    }}
                    onChange={(e) => onVolumeChange(Number(e.target.value))}
                />
            </div>
        </div>
    );
}
