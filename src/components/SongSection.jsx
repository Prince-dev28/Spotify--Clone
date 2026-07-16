export default function SongSection({ title, songs, globalIndexOffset, currentIndex, isPlaying, onPlay }) {
    if (!songs.length) return null;

    return (
        <div className="spotify-playlist">
            <h2>{title}</h2>
            <div className="card">
                {songs.map((song, i) => {
                    const globalIndex = globalIndexOffset + i;
                    const playing = globalIndex === currentIndex;
                    return (
                        <div
                            key={globalIndex}
                            className={`item ${playing ? "playing" : ""}`}
                            onClick={() => onPlay(globalIndex)}
                        >
                            <img src={song.cover} alt="" />
                            <div className="play-btn" onClick={(e) => { e.stopPropagation(); onPlay(globalIndex); }}>
                                <span>
                                    <i className={`fa-solid ${playing && isPlaying ? "fa-pause" : "fa-play"}`}></i>
                                </span>
                            </div>
                            <h4>{song.title}</h4>
                            <p>{song.artist}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
