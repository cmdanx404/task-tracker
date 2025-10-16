from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import uuid
import os

app = FastAPI(title="ZamarSync MVP")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

DB = os.path.join(os.path.dirname(__file__), "..", "..", "zamarsync.db")
DB = os.path.abspath(DB)

def init_db():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS songs (
        id TEXT PRIMARY KEY,
        title TEXT,
        lyrics TEXT
    )""")
    conn.commit()
    conn.close()

init_db()

class SongIn(BaseModel):
    title: str
    lyrics: str

class SongOut(SongIn):
    id: str

@app.get("/health")
def health():
    return {"status":"ok"}

@app.get("/songs", response_model=List[SongOut])
def list_songs():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("SELECT id, title, lyrics FROM songs")
    rows = c.fetchall()
    conn.close()
    return [{"id": r[0], "title": r[1], "lyrics": r[2]} for r in rows]

@app.post("/songs", response_model=SongOut)
def create_song(song: SongIn):
    sid = str(uuid.uuid4())
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("INSERT INTO songs (id, title, lyrics) VALUES (?, ?, ?)", (sid, song.title, song.lyrics))
    conn.commit()
    conn.close()
    return {"id": sid, "title": song.title, "lyrics": song.lyrics}

@app.get("/songs/{song_id}", response_model=SongOut)
def get_song(song_id: str):
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("SELECT id, title, lyrics FROM songs WHERE id=?", (song_id,))
    row = c.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Song not found")
    return {"id": row[0], "title": row[1], "lyrics": row[2]}

@app.put("/songs/{song_id}", response_model=SongOut)
def update_song(song_id: str, song: SongIn):
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("UPDATE songs SET title=?, lyrics=? WHERE id=?", (song.title, song.lyrics, song_id))
    if c.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Song not found")
    conn.commit()
    conn.close()
    return {"id": song_id, "title": song.title, "lyrics": song.lyrics}

@app.delete("/songs/{song_id}")
def delete_song(song_id: str):
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("DELETE FROM songs WHERE id=?", (song_id,))
    conn.commit()
    conn.close()
    return {"deleted": True}

@app.post("/ai/grammar")
def grammar_check(payload: dict):
    text = payload.get("text", "")
    # Placeholder grammar "correction": collapse whitespace, ensure first char uppercase
    corrected = " ".join(str(text).strip().split())
    if corrected:
        corrected = corrected[0].upper() + corrected[1:]
    return {"original": text, "corrected": corrected, "notes": "Placeholder grammar check — replace with real AI (OpenAI/LanguageTool) integration."}
