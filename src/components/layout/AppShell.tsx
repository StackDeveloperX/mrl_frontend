import type { ReactNode } from "react";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F5F7FA]">
      {/* Top dark header */}
      <Topbar />

      {/* Main body: sidebar + content */}
      <div className="flex flex-row">
        <Sidebar />
        <main className="flex-1 bg-[#F5F7FA] px-8 py-6 w-full">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
