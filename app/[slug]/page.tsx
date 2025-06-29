import Note from "@/components/note";
import { LocalNotesStorage } from "@/lib/local-storage";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { Note as NoteType } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const notes = LocalNotesStorage.getNotes();
  const note = notes.find(n => n.slug === slug);

  const title = note?.title || "new note";
  const emoji = note?.emoji || "👋🏼";

  return {
    title: `alana goyal | ${title}`,
    openGraph: {
      images: [
        `/api/og/?title=${encodeURIComponent(title)}&emoji=${encodeURIComponent(
          emoji
        )}`,
      ],
    },
  };
}

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