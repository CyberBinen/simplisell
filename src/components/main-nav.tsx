"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Wallet,
  Bell,
  BarChart,
  Settings,
  Briefcase,
  ShoppingBag,
  Users,

} from "lucide-react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/shop", label: "Shop", icon: ShoppingBag },
  { href: "/finance", label: "Finance", icon: Wallet },
  { href: "/analytics", label: "Analytics", icon: BarChart },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-background">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/" className="flex items-center gap-2 font-semibold font-headline">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span>SimpliBiz</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.href && "bg-accent text-accent-foreground font-semibold"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <aside className="fixed inset-x-0 bottom-0 z-50 block border-t bg-background md:hidden">
        <nav>
          <ul className="grid grid-cols-5">
            {navItems.filter(item => ["Dashboard", "Portfolio", "Shop", "Finance", "Customers"].includes(item.label)).map((item) => (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 text-muted-foreground transition-all",
                    pathname === item.href ? "text-primary" : "hover:text-primary"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
