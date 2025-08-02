import React from "react";

function SongList({ songs, onLyricsClick }) {
  return (
    <ul className="song-list">
      {songs.map((song) => (
        <li key={song.id} className="song-item">
          <span>
            <strong>{song.artist.name}</strong> - {song.title}
          </span>
          <button
            onClick={() => onLyricsClick(song.artist.name, song.title)}
          >
            Get Lyrics
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SongList;
