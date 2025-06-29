"use client";

import { useRouter } from "next/navigation";
import NoteHeader from "./note-header";
import NoteContent from "./note-content";
import SessionId from "./session-id";
import { useState, useCallback, useRef } from "react";
import { LocalNotesStorage } from "@/lib/local-storage";
import { Note as NoteType } from "@/lib/types";

export default function Note({ note: initialNote }: { note: NoteType }) {
  const router = useRouter();
  const [note, setNote] = useState(initialNote);
  const [sessionId, setSessionId] = useState("");
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const saveNote = useCallback(
    async (updates: Partial<NoteType>) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      const updatedNote = { ...note, ...updates };
      setNote(updatedNote);

      saveTimeoutRef.current = setTimeout(async () => {
        try {
          if (note.id && sessionId) {
            LocalNotesStorage.updateNote(note.id, updates);
          }
          router.refresh();
        } catch (error) {
          console.error("Save failed:", error);
        }
      }, 500);
    },
    [note, router, sessionId]
  );

  const canEdit = sessionId === note.session_id;

  return (
    <div className="h-full overflow-y-auto">
      <SessionId setSessionId={setSessionId} />
      <NoteHeader note={note} saveNote={saveNote} canEdit={canEdit} />
      <NoteContent note={note} saveNote={saveNote} canEdit={canEdit} />
    </div>
  );
}