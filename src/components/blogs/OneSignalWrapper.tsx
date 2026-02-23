"use client";

import dynamic from "next/dynamic";

const OneSignalBell = dynamic(() => import("./OneSignalBell"), {
  ssr: false,
});

export default function OneSignalWrapper() {
  return <OneSignalBell />;
}
