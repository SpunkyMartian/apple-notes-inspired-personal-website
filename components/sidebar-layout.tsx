"use client";

import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useMobileDetect } from "./mobile-detector";
import Sidebar from "./sidebar";
import { useRouter, usePathname } from "next/navigation";
import { LocalNotesStorage } from "@/lib/local-storage";
import { Note } from "@/lib/types";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const isMobile = useMobileDetect();
  const router = useRouter();
  const pathname = usePathname();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    setNotes(LocalNotesStorage.getNotes());
  }, []);

  useEffect(() => {
    if (isMobile !== null && !isMobile && pathname === "/") {
      router.push("/about-me");
    }
  }, [isMobile, router, pathname]);

  const handleNoteSelect = (note: Note) => {
    router.push(`/${note.slug}`);
  };

  const refreshNotes = () => {
    setNotes(LocalNotesStorage.getNotes());
  };

  if (isMobile === null) {
    return null;
  }

  const showSidebar = !isMobile || pathname === "/";

  return (
    <div className="bg-[#1c1c1c] text-white min-h-dvh flex">
      {showSidebar && (
        <div
          className={`${
            isMobile
              ? "w-full"
              : "w-64 flex-shrink-0 border-r border-gray-400/20"
          } overflow-y-auto h-dvh`}
        >
          <Sidebar
            notes={notes}
            onNoteSelect={isMobile ? handleNoteSelect : () => {}}
            isMobile={isMobile}
            refreshNotes={refreshNotes}
          />
        </div>
      )}
      {(!isMobile || !showSidebar) && (
        <div className="flex-grow overflow-y-auto h-dvh">{children}</div>
      )}
      <Toaster />
    </div>
  );
}