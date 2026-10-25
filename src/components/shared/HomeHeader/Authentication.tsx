import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, LogOut, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import { getCurrentEmail, isLoggedIn, LogoutUser } from "@/lib/auth";
import { themeStyles, type ThemeKey } from "./themes";

type AuthLinksProps = {
  selectedTheme: ThemeKey;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

function getSafeTheme(value: unknown): ThemeKey {
  switch (value) {
    case "slate":
    case "blue":
    case "emerald":
    case "rose":
      return value;
    default:
      return "slate";
  }
}

export default function AuthLinks({
  selectedTheme,
  variant = "desktop",
  onNavigate,
}: AuthLinksProps) {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [email, setEmail] = useState<string | null>(getCurrentEmail);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const activeTheme = themeStyles[getSafeTheme(selectedTheme)];
  const isMobile = variant === "mobile";

  useEffect(() => {
    function syncAuth() {
      setLoggedIn(isLoggedIn());
      setEmail(getCurrentEmail());
    }

    window.addEventListener("storage", syncAuth);
    window.addEventListener("leivora-auth-change", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("leivora-auth-change", syncAuth);
    };
  }, []);

  function handleLogout() {
    LogoutUser();

    setLoggedIn(false);
    setEmail(null);
    setProfileMenuOpen(false);

    window.dispatchEvent(new Event("leivora-auth-change"));

    onNavigate?.();
    navigate("/", { replace: true });
  }

  const avatarLetter = (email?.trim().charAt(0) || "U").toUpperCase();

  if (!loggedIn) {
    return (
      <div
        className={cn("flex items-center gap-2", isMobile && "w-full flex-col")}
      >
        <Link
          to="/login"
          onClick={onNavigate}
          className={cn(
            "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors",
            isMobile ? "w-full px-3 py-2.5" : "px-3 py-2 sm:px-4",
            activeTheme.login,
          )}
        >
          Login
        </Link>

        <Link
          to="/register"
          onClick={onNavigate}
          className={cn(
            "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors",
            isMobile ? "w-full px-3 py-2.5" : "px-4 py-2",
            activeTheme.signup,
          )}
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        isMobile && "w-auto flex-row items-center",
      )}
    >

      <div className="relative">
        <button
          type="button"
          aria-label="Toggle profile menu"
          aria-expanded={profileMenuOpen}
          onClick={() => setProfileMenuOpen((open) => !open)}
          className="flex items-center justify-center rounded-full p-1.5 transition-colors hover:bg-zinc-100"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white ring-2 ring-zinc-200">
            {avatarLetter}
          </span>
        </button>

        {profileMenuOpen && (
          <>
            <button
              type="button"
              aria-label="Close profile menu"
              className="fixed inset-0 z-[150] cursor-default"
              onClick={() => setProfileMenuOpen(false)}
            />

            <div className="absolute right-0 z-[160] mt-2 w-64 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 text-zinc-900 shadow-xl">
              <div className="border-b border-zinc-100 px-3 py-3">
                <p className="text-xs font-medium text-zinc-500">
                  Signed in as
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-zinc-900">
                  {email}
                </p>
              </div>

              <Link
                to="/profile"
                onClick={() => {
                  setProfileMenuOpen(false);
                  onNavigate?.();
                }}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
              >
                <UserRound className="size-5 shrink-0" strokeWidth={2} />
                <span>My Profile</span>
              </Link>

              <Link
                to="/notifications"
                onClick={() => {
                  setProfileMenuOpen(false);
                  onNavigate?.();
                }}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
              >
                <Bell className="size-5 shrink-0" strokeWidth={2} />
                <span>Notifications</span>
              </Link>

              <div className="my-1 border-t border-zinc-100" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50"
              >
                <LogOut className="size-5 shrink-0" strokeWidth={2} />
                <span>Log out</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}