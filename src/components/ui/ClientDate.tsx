"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

export function ClientDate({ date }: { date: string | Date }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span>Just now</span>;
  }

  return (
    <span>{formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
  );
}
