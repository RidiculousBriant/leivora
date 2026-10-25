export type ThemeKey = "slate" | "blue" | "emerald" | "rose";

export const themes = [
  {
    value: "slate",
    label: "Slate",
    color: "#475569",
  },
  {
    value: "blue",
    label: "Ocean Blue",
    color: "#2563EB",
  },
  {
    value: "emerald",
    label: "Forest Green",
    color: "#059669",
  },
  {
    value: "rose",
    label: "Rose",
    color: "#E11D48",
  },
] as const;

export const isThemeKey = (value: unknown): value is ThemeKey => {
  return (
    typeof value === "string" &&
    themes.some((theme) => theme.value === value)
  );
};

export const getValidTheme = (value: unknown): ThemeKey => {
  return isThemeKey(value) ? value : "slate";
};

export const themeStyles: Record<
  ThemeKey,
  {
    logo: string;
    login: string;
    signup: string;
    focus: string;
  }
> = {
  slate: {
    logo: "text-slate-600",
    login: "text-slate-700 hover:bg-slate-100",
    signup: "bg-slate-600 text-white hover:bg-slate-700",
    focus: "focus-visible:border-slate-500 focus-visible:ring-slate-500",
  },
  blue: {
    logo: "text-blue-600",
    login: "text-blue-700 hover:bg-blue-50",
    signup: "bg-blue-600 text-white hover:bg-blue-700",
    focus: "focus-visible:border-blue-500 focus-visible:ring-blue-500",
  },
  emerald: {
    logo: "text-emerald-600",
    login: "text-emerald-700 hover:bg-emerald-50",
    signup: "bg-emerald-600 text-white hover:bg-emerald-700",
    focus:
      "focus-visible:border-emerald-500 focus-visible:ring-emerald-500",
  },
  rose: {
    logo: "text-rose-600",
    login: "text-rose-700 hover:bg-rose-50",
    signup: "bg-rose-600 text-white hover:bg-rose-700",
    focus: "focus-visible:border-rose-500 focus-visible:ring-rose-500",
  },
};