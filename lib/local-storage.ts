import { Note } from "./types";

export class LocalNotesStorage {
  private static NOTES_KEY = "notes";
  private static SESSION_KEY = "session_id";

  static getNotes(): Note[] {
    if (typeof window === "undefined") return [];
    const notes = localStorage.getItem(this.NOTES_KEY);
    return notes ? JSON.parse(notes) : this.getDefaultNotes();
  }

  static saveNotes(notes: Note[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
  }

  static addNote(note: Note): void {
    const notes = this.getNotes();
    notes.unshift(note);
    this.saveNotes(notes);
  }

  static updateNote(id: string, updates: Partial<Note>): void {
    const notes = this.getNotes();
    const index = notes.findIndex(note => note.id === id);
    if (index !== -1) {
      notes[index] = { ...notes[index], ...updates };
      this.saveNotes(notes);
    }
  }

  static deleteNote(id: string): void {
    const notes = this.getNotes();
    const filtered = notes.filter(note => note.id !== id);
    this.saveNotes(filtered);
  }

  static getSessionId(): string {
    if (typeof window === "undefined") return "";
    let sessionId = localStorage.getItem(this.SESSION_KEY);
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem(this.SESSION_KEY, sessionId);
    }
    return sessionId;
  }

  private static getDefaultNotes(): Note[] {
    const sessionId = this.getSessionId();
    return [
      {
        id: "about-me",
        slug: "about-me",
        title: "About Me",
        content: `# Welcome to my notes app!

This is a demo of a beautiful notes application with a clean, modern design.

## Features
- Create and edit notes
- Markdown support
- Search functionality
- Pin important notes
- Responsive design
- Dark theme

Feel free to create your own notes and explore the interface!`,
        created_at: new Date().toISOString(),
        session_id: sessionId,
        emoji: "👋🏼",
        public: true,
      },
      {
        id: "quick-links",
        slug: "quick-links",
        title: "Quick Links",
        content: `# Useful Links

## Development
- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

## Design
- [Figma](https://figma.com)
- [Dribbble](https://dribbble.com)
- [Behance](https://behance.net)

## Tools
- [GitHub](https://github.com)
- [VS Code](https://code.visualstudio.com)
- [Vercel](https://vercel.com)`,
        created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        session_id: sessionId,
        emoji: "🔗",
        public: true,
      }
    ];
  }
}