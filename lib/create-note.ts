import { LocalNotesStorage } from "./local-storage";
import { toast } from "@/components/ui/use-toast";

export async function createNote(
  sessionId: string | null,
  router: any,
  addNewPinnedNote: (slug: string) => void,
  refreshNotes: () => void,
  setSelectedNoteSlug: (slug: string | null) => void,
  isMobile: boolean
) {
  const noteId = crypto.randomUUID();
  const slug = `new-note-${noteId}`;

  const note = {
    id: noteId,
    slug: slug,
    title: "",
    content: "",
    public: false,
    created_at: new Date().toISOString(),
    session_id: sessionId || "",
    category: "today",
    emoji: "👋🏼",
  };

  try {
    LocalNotesStorage.addNote(note);

    addNewPinnedNote(slug);

    if (!isMobile) {
      refreshNotes();
      setSelectedNoteSlug(slug);
      router.push(`/${slug}`);
      router.refresh();
    } else {
      router.push(`/${slug}`).then(() => {
        refreshNotes();
        setSelectedNoteSlug(slug);
      });
    }

    toast({
      description: "Private note created",
    });
  } catch (error) {
    console.error("Error creating note:", error);
  }
}