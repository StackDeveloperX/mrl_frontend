"use client";

import { Bell, HelpCircle, Square, ChevronDown } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between bg-[#1A2B4C] px-6 text-white">
      {/* LEFT: Logo + Branch */}
      <div className="flex items-center gap-8">
        <img
          src="/images/topbaricon.png"
          alt="MRL Logo"
          className="h-9 w-auto"
        />

        {/* Branch pill */}
        <button className="flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-4 py-1.5 text-sm font-medium">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-white/40">
            <Square className="h-3 w-3" strokeWidth={2} />
          </span>
          <span>Main Office</span>
          <ChevronDown className="h-4 w-4 opacity-80" />
        </button>
      </div>

      {/* RIGHT: Icons + profile */}
      <div className="flex items-center gap-6 text-sm">
        {/* Layout / full-screen icon placeholder */}
        <button className="rounded-md border border-white/40 px-2 py-1 hover:bg-white/10">
          <Square className="h-4 w-4" />
        </button>

        {/* Bell */}
        <button className="relative rounded-full p-2 hover:bg-white/10">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-[#FF5A5F]" />
        </button>

        {/* Help */}
        <button className="flex items-center gap-1 text-sm font-medium hover:text-[#4ED1C1]">
          <HelpCircle className="h-4 w-4" />
          <span>Help</span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
            {/* use your own avatar / logo here */}
            <img
              src="https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png"
              alt="User"
              className="h-9 w-9 rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Admin name</span>
            <span className="text-xs opacity-80">admin@mrl.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}
