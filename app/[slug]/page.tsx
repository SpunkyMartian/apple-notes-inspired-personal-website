"use client";

import Note from "@/components/note";
import { LocalNotesStorage } from "@/lib/local-storage";
import { redirect } from "next/navigation";
import { Note as NoteType } from "@/lib/types";

export const dynamic = "force-dynamic";

export default function NotePage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const notes = LocalNotesStorage.getNotes();
  const note = notes.find(n => n.slug === slug);

  if (!note) {
    redirect("/error");
  }

  return (
    <div className="w-full min-h-dvh p-3">
      <Note note={note} />
    </div>
  );
}