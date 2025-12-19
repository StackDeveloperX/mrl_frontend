"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  CalendarDays,
  Users,
  ClipboardList,
  Search,
  PanelsTopLeft,
  Settings,
} from "lucide-react";

const menu = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/jobs", label: "Jobs", icon: BriefcaseBusiness },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/invoices", label: "Invoices", icon: ClipboardList },
  { href: "/logs", label: "Logs", icon: Search },
  { href: "/integrations", label: "Integrations", icon: PanelsTopLeft },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-20 flex-col border-r border-[#E5E7EB] bg-white">
      {/* spacer under topbar (so content starts below the dark header line visually) */}
      <div className="h-4" />

      <nav className="flex-1">
        <ul className="space-y-2">
          {menu.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex flex-col items-center gap-1 px-4 py-2 text-xs"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-[10px] border text-[#1A2B4C] ${active
                      ? "border-transparent bg-[#DFFAF7]"
                      : "border-transparent bg-transparent"
                      }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.4} />
                  </span>
                  <span
                    className={`mt-1 ${active
                      ? "font-semibold text-[#1A2B4C]"
                      : "font-medium text-[#1A2B4C]"
                      }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
