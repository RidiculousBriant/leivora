import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";

import { themes, type ThemeKey } from "./themes";

type ThemeSelectorProps = {
  id: string;
  selectedTheme: ThemeKey;
  onThemeChange: (value: ThemeKey) => void;
};

export default function ThemeSelector({
  id,
  selectedTheme,
  onThemeChange,
}: ThemeSelectorProps) {
  const activeTheme = themes.find(
    (theme) => theme.value === selectedTheme,
  );

  return (
    <Select
      value={selectedTheme}
      onValueChange={(value) => onThemeChange(value as ThemeKey)}
    >
      <SelectTrigger
        id={id}
        aria-label="Choose color theme"
        className="!size-10 !min-w-10 shrink-0 !justify-center !gap-0 rounded-full border border-zinc-300 bg-zinc-50 !p-0 shadow-none hover:bg-zinc-200 focus-visible:ring-2 focus-visible:ring-zinc-300 [&>svg:last-child]:hidden"
      >
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-900 p-0.5"
        >
          <span
            className="size-full rounded-full"
            style={{ backgroundColor: activeTheme?.color }}
          />
        </span>
      </SelectTrigger>

      <SelectContent
        side="bottom"
        align="end"
        sideOffset={6}
        alignItemWithTrigger={false}
        className="min-w-[180px] rounded-xl border border-zinc-200 bg-zinc-50 p-1.5 text-zinc-900 shadow-lg"
      >
        <SelectGroup>
          <SelectLabel className="px-2.5 py-2 text-sm text-zinc-500">
            Select Theme
          </SelectLabel>

          {themes.map((theme) => (
            <SelectItem
              key={theme.value}
              value={theme.value}
              className="cursor-pointer rounded-lg px-2.5 py-2 text-sm text-zinc-800 hover:bg-zinc-200 focus:bg-zinc-200 focus:text-zinc-950"
            >
              <span
                aria-hidden="true"
                className="size-3.5 shrink-0 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: theme.color }}
              />
              <span>{theme.label}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
