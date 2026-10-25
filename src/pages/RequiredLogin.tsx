import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleHelp, LockKeyhole, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

type ThemeName = "slate" | "blue" | "emerald" | "rose";

const themes: Record<
  ThemeName,
  {
    primary: string;
    hover: string;
    soft: string;
    border: string;
    text: string;
    ring: string;
  }
> = {
  slate: {
    primary: "#18181b",
    hover: "#3f3f46",
    soft: "#f4f4f5",
    border: "#d4d4d8",
    text: "#27272a",
    ring: "rgba(24, 24, 27, 0.12)",
  },
  blue: {
    primary: "#2563eb",
    hover: "#1d4ed8",
    soft: "#eff6ff",
    border: "#bfdbfe",
    text: "#1d4ed8",
    ring: "rgba(37, 99, 235, 0.14)",
  },
  emerald: {
    primary: "#059669",
    hover: "#047857",
    soft: "#ecfdf5",
    border: "#a7f3d0",
    text: "#047857",
    ring: "rgba(5, 150, 105, 0.14)",
  },
  rose: {
    primary: "#e11d48",
    hover: "#be123c",
    soft: "#fff1f2",
    border: "#fecdd3",
    text: "#be123c",
    ring: "rgba(225, 29, 72, 0.14)",
  },
};

function getSavedTheme(): ThemeName {
  try {
    const savedTheme = localStorage.getItem("leivora-theme");

    if (
      savedTheme === "slate" ||
      savedTheme === "blue" ||
      savedTheme === "emerald" ||
      savedTheme === "rose"
    ) {
      return savedTheme;
    }
  } catch {
    // Fall back to the default theme.
  }

  return "slate";
}

export default function RequiredLogin() {
  const navigate = useNavigate();

  const [selectedTheme, setSelectedTheme] = useState<ThemeName>(getSavedTheme);

  useEffect(() => {
    const syncTheme = () => setSelectedTheme(getSavedTheme());

    window.addEventListener("storage", syncTheme);
    window.addEventListener("leivora-theme-change", syncTheme);

    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("leivora-theme-change", syncTheme);
    };
  }, []);

  const theme = themes[selectedTheme];

  return (
    <div
      className="required-login-page flex min-h-dvh flex-col overflow-x-hidden bg-zinc-50 text-zinc-900"
      style={
        {
          "--login-primary": theme.primary,
          "--login-hover": theme.hover,
          "--login-soft": theme.soft,
          "--login-border": theme.border,
          "--login-text": theme.text,
          "--login-ring": theme.ring,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <header className="login-header-animation relative z-20 shrink-0 border-b border-zinc-200/80 bg-white/95 backdrop-blur-xl lg:px-50">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-8 lg:px-12">
          <Link
            to="/"
            aria-label="Leivora home"
            className="brand-logo shrink-0 text-xl transition-colors sm:text-2xl"
          >
            LEIVORA
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden text-sm text-zinc-500 sm:inline">
              Need help?
            </span>

            <a
              href="mailto:support@leivora.com"
              className="login-help-link inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 sm:gap-2 sm:px-4 sm:text-sm"
            >
              <CircleHelp className="size-4 shrink-0" />
              <span>Contact us</span>
            </a>
          </div>
        </div>
      </header>

      {/* Responsive main area */}
      <main className="login-main relative flex flex-1 items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
        {/* Subtle theme-colored background accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-100px] top-1/4 size-56 rounded-full blur-3xl sm:size-64"
          style={{ backgroundColor: theme.soft, opacity: 0.85 }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1/4 right-[-100px] size-56 rounded-full blur-3xl sm:size-64"
          style={{ backgroundColor: theme.soft, opacity: 0.8 }}
        />

        <section
          aria-labelledby="required-login-title"
          className="login-card relative z-10 my-auto w-full max-w-[420px] overflow-hidden bg-zinc-50 px-5 py-6 text-center sm:px-9 sm:py-8"
        >

          {/* Lock icon */}
          <div
            className="login-icon-animation login-lock mx-auto flex size-14 items-center justify-center rounded-2xl sm:size-16"
            style={{
              backgroundColor: theme.soft,
              color: theme.primary,
              boxShadow: `0 0 0 1px ${theme.ring}`,
            }}
          >
            <div className="login-float-animation">
              <LockKeyhole className="size-7 sm:size-8" strokeWidth={1.7} />
            </div>
          </div>

          {/* Text content */}
          <div className="login-content-animation">
            <p
              className="login-eyebrow mt-6 text-[10px] font-bold uppercase tracking-[0.25em] sm:mt-7 sm:text-[11px]"
              style={{ color: theme.text }}
            >
              LEIVORA MEMBERS
            </p>

            <h1
              id="required-login-title"
              className="mt-2.5 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-[30px] sm:leading-tight"
            >
              Sign in to continue
            </h1>

            <p className="login-description mx-auto mt-3 max-w-[330px] text-sm leading-6 text-zinc-500 sm:mt-3 sm:text-[15px]">
              You’re one step away from your next favorite find. Log in to
              continue with your purchase and proceed to checkout.
            </p>

            {/* Security note */}
            <div
              className="login-security mt-5 flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium sm:mt-5 sm:py-3"
              style={{
                backgroundColor: theme.soft,
                color: theme.text,
              }}
            >
              <ShieldCheck className="size-4 shrink-0" />
              <span>Your shopping experience starts here</span>
            </div>
          </div>

          {/* Actions */}
          <div className="login-actions login-actions-animation mt-6 flex flex-col gap-2.5 sm:mt-7 sm:gap-3">
            <Button
              type="button"
              onClick={() => navigate("/login")}
              className="login-primary-button group h-11 w-full rounded-full text-sm font-semibold text-white sm:h-12"
            >
              Log In to Continue
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
              className="login-outline-button h-11 w-full rounded-full border-zinc-200 bg-white text-sm font-medium text-zinc-700 sm:h-12"
            >
              Back to Home
            </Button>
          </div>

          <p className="login-tagline mt-5 text-xs leading-5 text-zinc-400 sm:mt-6">
            Your next favorite find is waiting for you.
          </p>
        </section>
      </main>

      <footer className="relative z-10 shrink-0 border-t border-zinc-200/80 bg-white px-4 py-3 sm:py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-1 text-center text-[10px] text-zinc-400 sm:flex-row sm:justify-between sm:text-xs">
          <p>© {new Date().getFullYear()} LEIVORA. All rights reserved.</p>
          <p>Thoughtfully selected. Made for your style.</p>
        </div>
      </footer>
    </div>
  );
}
