"use client";

import { useEffect, useState } from "react";
import type { ComponentProps, FormEvent } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

import type { ThemeKey } from "@/components/shared/HomeHeader/themes";

const THEME_STORAGE_KEY = "leivora-theme";

const validThemes: ThemeKey[] = [
  "slate",
  "blue",
  "emerald",
  "rose",
];

const signupThemes: Record<
  ThemeKey,
  {
    accentText: string;
    inputFocus: string;
    labelFocus: string;
    primaryButton: string;
    socialFocus: string;
    separator: string;
  }
> = {
  slate: {
    accentText: "text-zinc-900 hover:text-zinc-700",
    inputFocus:
      "focus-visible:!border-zinc-900 focus-visible:!ring-zinc-900",
    labelFocus: "peer-focus:text-zinc-900",
    primaryButton: "bg-zinc-900 text-white hover:bg-zinc-800",
    socialFocus:
      "focus-visible:!border-zinc-900 focus-visible:!ring-zinc-900",
    separator: "bg-zinc-200",
  },
  blue: {
    accentText: "text-blue-700 hover:text-blue-800",
    inputFocus:
      "focus-visible:!border-blue-600 focus-visible:!ring-blue-600",
    labelFocus: "peer-focus:text-blue-700",
    primaryButton: "bg-blue-600 text-white hover:bg-blue-700",
    socialFocus:
      "focus-visible:!border-blue-600 focus-visible:!ring-blue-600",
    separator: "bg-blue-100",
  },
  emerald: {
    accentText: "text-emerald-800 hover:text-emerald-900",
    inputFocus:
      "focus-visible:!border-emerald-700 focus-visible:!ring-emerald-700",
    labelFocus: "peer-focus:text-emerald-800",
    primaryButton: "bg-emerald-700 text-white hover:bg-emerald-800",
    socialFocus:
      "focus-visible:!border-emerald-700 focus-visible:!ring-emerald-700",
    separator: "bg-emerald-100",
  },
  rose: {
    accentText: "text-rose-700 hover:text-rose-800",
    inputFocus:
      "focus-visible:!border-rose-600 focus-visible:!ring-rose-600",
    labelFocus: "peer-focus:text-rose-700",
    primaryButton: "bg-rose-600 text-white hover:bg-rose-700",
    socialFocus:
      "focus-visible:!border-rose-600 focus-visible:!ring-rose-600",
    separator: "bg-rose-100",
  },
};

function getSavedTheme(): ThemeKey {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme && validThemes.includes(savedTheme as ThemeKey)) {
      return savedTheme as ThemeKey;
    }
  } catch {
    // Use the default theme if local storage is unavailable.
  }

  return "slate";
}

export function SignupForm({
  className,
  ...props
}: ComponentProps<"form">) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedTheme, setSelectedTheme] =
    useState<ThemeKey>(getSavedTheme);

  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  useEffect(() => {
    function syncTheme() {
      setSelectedTheme(getSavedTheme());
    }

    window.addEventListener("leivora-theme-change", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("leivora-theme-change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const theme = signupThemes[selectedTheme];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Form validation successful.");
  }

  const inputClassName = cn(
    "peer h-12 w-full rounded-full border border-solid border-zinc-300 bg-transparent px-4 text-sm",
    "focus-visible:outline-none focus-visible:!ring-1",
    "focus-visible:!ring-offset-0",
    theme.inputFocus,
  );

  const labelClassName = cn(
    "pointer-events-none absolute left-5 z-10 px-1",
    "bg-[#fafafa] text-sm text-zinc-500",
    "transition-all duration-200",
    "top-1/2 -translate-y-1/2",
    "peer-focus:top-0 peer-focus:-translate-y-1/2",
    "peer-focus:text-xs",
    theme.labelFocus,
    "peer-[:not(:placeholder-shown)]:top-0",
    "peer-[:not(:placeholder-shown)]:-translate-y-1/2",
    "peer-[:not(:placeholder-shown)]:text-xs",
  );

  const socialButtonClassName = cn(
    "h-10 rounded-full border border-zinc-300 bg-white text-zinc-900",
    "hover:bg-zinc-100 focus-visible:!ring-1",
    "focus-visible:!ring-offset-0",
    theme.socialFocus,
  );

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-zinc-950">
            Create your account
          </h1>

          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        <Field className="gap-5">
          <div className="relative">
            <Input
              id="last-name"
              name="lastName"
              type="text"
              placeholder=" "
              autoComplete="family-name"
              required
              className={inputClassName}
            />
            <label htmlFor="last-name" className={labelClassName}>
              Last Name
            </label>
          </div>

          <div className="relative">
            <Input
              id="first-name"
              name="firstName"
              type="text"
              placeholder=" "
              autoComplete="given-name"
              required
              className={inputClassName}
            />
            <label htmlFor="first-name" className={labelClassName}>
              First Name
            </label>
          </div>

          <div className="relative">
            <Input
              id="middle-name"
              name="middleName"
              type="text"
              placeholder=" "
              autoComplete="additional-name"
              className={inputClassName}
            />
            <label htmlFor="middle-name" className={labelClassName}>
              Middle Name
            </label>
          </div>

          <div className="relative">
            <Input
              id="signup-email"
              name="email"
              type="email"
              placeholder=" "
              autoComplete="email"
              required
              className={inputClassName}
            />
            <label htmlFor="signup-email" className={labelClassName}>
              Email
            </label>
          </div>

          <FieldDescription className="-mt-3 px-4">
            We&apos;ll use this to contact you and will not share your email
            with anyone else.
          </FieldDescription>

          <div className="relative">
            <Input
              id="signup-password"
              name="password"
              type="password"
              placeholder=" "
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className={inputClassName}
            />
            <label htmlFor="signup-password" className={labelClassName}>
              Password
            </label>
          </div>

          <FieldDescription className="-mt-3 px-4">
            Must be at least 8 characters long.
          </FieldDescription>

          <div className="relative">
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              placeholder=" "
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              className={inputClassName}
            />
            <label htmlFor="confirm-password" className={labelClassName}>
              Confirm Password
            </label>
          </div>

          {passwordsMismatch && (
            <p className="-mt-3 px-4 text-xs text-red-600" role="alert">
              Passwords do not match.
            </p>
          )}
        </Field>

        <Field>
          <Button
            type="submit"
            className={cn(
              "h-12 w-full rounded-full transition-colors",
              theme.primaryButton,
            )}
          >
            Create Account
          </Button>
        </Field>

        <div className="my-1 flex w-full items-center gap-4">
          <div
            aria-hidden="true"
            className={cn("h-px flex-1", theme.separator)}
          />

          <span className="shrink-0 text-xs font-medium text-zinc-500">
            Or continue with
          </span>

          <div
            aria-hidden="true"
            className={cn("h-px flex-1", theme.separator)}
          />
        </div>

        <Field className="grid gap-4 sm:grid-cols-2">
          <Button
            variant="outline"
            type="button"
            className={socialButtonClassName}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-[18px] shrink-0"
              aria-hidden="true"
            >
              <path
                fill="#000000"
                d="M16.365 1.43c0 1.14-.416 2.22-1.178 3.05-.815.9-2.142 1.594-3.253 1.5a4.25 4.25 0 0 1 1.21-3.15c.87-.93 2.34-1.59 3.22-1.4ZM20.79 17.04c-.58 1.3-.86 1.88-1.61 3.03-1.05 1.6-2.53 3.6-4.36 3.62-1.63.02-2.05-1.06-4.27-1.05-2.22.01-2.68 1.07-4.31 1.06-1.83-.02-3.23-1.82-4.28-3.42-2.94-4.48-3.25-9.73-1.43-12.52a6.5 6.5 0 0 1 5.24-3.15c1.63-.03 2.66 1.1 4.26 1.1 1.55 0 2.5-1.1 4.25-1.1 1.33 0 2.74.72 3.74 1.96-3.29 1.8-2.76 6.5.77 7.79-.62 1.4-.9 2.02-1.99 3.68Z"
              />
            </svg>
            Continue with Apple
          </Button>

          <Button
            variant="outline"
            type="button"
            className={socialButtonClassName}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="size-[18px] shrink-0"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-1.9 4.6-4 6v5.1h6.5c3.8-3.5 6.1-8.6 6.1-14.8Z"
              />
              <path
                fill="#34A853"
                d="M24 44c5.5 0 10.1-1.8 13.5-4.8L31 34.1c-1.8 1.2-4.1 2-7 2-5.3 0-9.8-3.6-11.4-8.4H5.9v5.2C9.3 39.5 16.1 44 24 44Z"
              />
              <path
                fill="#FBBC05"
                d="M12.6 27.7a12 12 0 0 1 0-7.4v-5.2H5.9a20 20 0 0 0 0 17.8l6.7-5.2Z"
              />
              <path
                fill="#EA4335"
                d="M24 11.9c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.8 29.5 4 24 4 16.1 4 9.3 8.5 5.9 15.1l6.7 5.2c1.6-4.8 6.1-8.4 11.4-8.4Z"
              />
            </svg>
            Continue with Google
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className={cn(
              "font-semibold underline-offset-4 hover:underline",
              theme.accentText,
            )}
          >
            Sign in
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}