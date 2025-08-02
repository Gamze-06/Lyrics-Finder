import React, { useState, useEffect } from "react";
import SongList from "./SongList";

const API_URL = "https://api.lyrics.ovh";

function Search() {
  const [term, setTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [lyrics, setLyrics] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!term.trim()) return;
    try {
      const res = await fetch(`${API_URL}/suggest/${term}`);
      const data = await res.json();
      setSongs(data.data);
      setLyrics(""); // önceki şarkı sözünü temizle
    } catch (err) {
      console.error("Arama hatası:", err);
    }
  };

  const fetchLyrics = async (artist, title) => {
    try {
      const res = await fetch(`${API_URL}/v1/${artist}/${title}`);
      const data = await res.json();
      if (data.lyrics) {
        setLyrics(`${artist} - ${title}\n\n${data.lyrics}`);
      } else {
        setLyrics("Şarkı sözü bulunamadı.");
      }
    } catch (err) {
      console.error("Lyrics getirme hatası:", err);
      setLyrics("Şarkı sözü alınamadı.");
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Şarkı veya sanatçı ara..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button type="submit">Ara</button>
      </form>

      <SongList songs={songs} onLyricsClick={fetchLyrics} />

      {lyrics && (
        <div className="lyrics-box">
          <pre>{lyrics}</pre>
        </div>
      )}
    </div>
  );
}

export default Search;
