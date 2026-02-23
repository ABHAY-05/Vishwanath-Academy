"use client";

import { useEffect, useState } from "react";
import OneSignal from "react-onesignal";
import { Bell, BellRing, BellOff } from "lucide-react";

export default function OneSignalBell() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    // Only initialize OneSignal if we have an App ID
    if (!process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID) {
      console.warn(
        "OneSignal App ID is not configured in environment variables.",
      );
      return;
    }

    const initializeOneSignal = async () => {
      try {
        try {
          await OneSignal.init({
            appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID as string,
            allowLocalhostAsSecureOrigin: true, // Useful for testing
          });
        } catch (initErr: any) {
          // React Strict Mode calls useEffect twice, causing OneSignal to throw an already initialized error.
          // We can safely catch and ignore this specific error to allow the rest of the setup to continue.
          if (!initErr?.message?.includes("already initialized")) {
            throw initErr;
          }
        }

        setIsInitialized(true);

        // Check initial subscription status
        const subscribed = OneSignal.User.PushSubscription.optedIn;
        setIsSubscribed(!!subscribed);

        // Listen for subscription changes
        OneSignal.User.PushSubscription.addEventListener("change", (e) => {
          setIsSubscribed(e.current.optedIn);
        });
      } catch (error: any) {
        console.error("OneSignal initialization failed:", error);

        // Detect if it's an AdBlocker blocking the CDN script
        if (
          error?.message?.includes("Failed to fetch") ||
          error?.name === "TypeError" ||
          /blocked|ERR_BLOCKED_BY_CLIENT/i.test(error?.message || "")
        ) {
          setIsBlocked(true);
        }

        setIsSupported(false); // Browser might not support Web Push, or blocked
      }
    };

    initializeOneSignal();
  }, []);

  const toggleSubscription = async () => {
    if (!isInitialized) return;

    if (isSubscribed) {
      const confirmUnsub = window.confirm(
        "Are you sure you want to unsubscribe from notifications?",
      );
      if (confirmUnsub) {
        await OneSignal.User.PushSubscription.optOut();
        setIsSubscribed(false);
      }
    } else {
      // Trigger optIn (which will enable if already granted natively)
      await OneSignal.User.PushSubscription.optIn();
      // And show the slidedown prompt if they haven't granted native permission
      await OneSignal.Slidedown.promptPush();
    }
  };

  // Do not render if the browser doesn't support Web Push, or if initialization failed.
  if (!isSupported && !isBlocked) return null;

  const handleBlockedClick = () => {
    alert(
      "Push Notifications are blocked by your AdBlocker or browser privacy settings. Please disable your AdBlocker on this site (or allow cdn.onesignal.com) to subscribe to updates.",
    );
  };

  if (!process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <button
        onClick={isBlocked ? handleBlockedClick : toggleSubscription}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
          isBlocked
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        aria-label={
          isBlocked
            ? "Notifications Blocked"
            : isSubscribed
              ? "Unsubscribe from notifications"
              : "Subscribe to notifications"
        }
      >
        {isBlocked ? (
          <BellOff size={24} className="opacity-80" />
        ) : isSubscribed ? (
          <BellRing size={24} className="animate-pulse" fill="currentColor" />
        ) : (
          <Bell
            size={24}
            className="group-hover:-rotate-12 transition-transform"
          />
        )}

        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl pointer-events-none origin-right scale-95 group-hover:scale-100">
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-900 dark:bg-neutral-100 rotate-45" />
          {isBlocked
            ? "Notifications Blocked"
            : isSubscribed
              ? "Notifications Enabled"
              : "Get Blog Updates"}
        </div>
      </button>

      {/* Subscription Status Indicator dot */}
      {isSubscribed && !isBlocked && (
        <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-neutral-900" />
      )}
    </div>
  );
}
