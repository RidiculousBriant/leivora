import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { categories } from "@/types/NavigationCategories";
import CategoryMegaMenu from "@/pages/navigation/CategoryMegaMenu";

export default function DesktopNavigation() {
  return (
    <nav
      aria-label="Product categories"
      className="hidden justify-center md:flex"
    >
      <NavigationMenu>
        <NavigationMenuList className="flex-wrap gap-1">
          {categories.map((category) => (
            <NavigationMenuItem key={category.label}>
              <NavigationMenuTrigger
                className={cn(
                  "h-11 bg-transparent px-4 text-sm font-medium text-slate-600 hover:bg-transparent data-[state=open]:bg-transparent",
                  "hover:text-zinc-900 data-[state=open]:text-zinc-900",
                )}
              >
                {category.label}
              </NavigationMenuTrigger>

              <CategoryMegaMenu category={category} />
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}