"use client";

import { useEffect } from "react";
import { LocalNotesStorage } from "@/lib/local-storage";

interface SessionIdProps {
  setSessionId: (id: string) => void;
}

export default function SessionId({ setSessionId }: SessionIdProps) {
  useEffect(() => {
    const sessionId = LocalNotesStorage.getSessionId();
    setSessionId(sessionId);
  }, [setSessionId]);

  return null;
}