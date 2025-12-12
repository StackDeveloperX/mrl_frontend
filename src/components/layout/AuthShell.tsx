"use client";

import type { ReactNode } from "react";

type AuthShellProps = {
    children: ReactNode;
    topRightLink?: { href: string; label: string };
};

export function AuthShell({ children, topRightLink }: AuthShellProps) {
    return (
        <div className="flex min-h-screen bg-mrl-pageBg">
            {/* Left panel – form */}
            <div className="flex w-full max-w-md flex-col bg-mrl-card shadow-lg md:ml-16 md:my-10 md:rounded-xl">
                <header className="flex items-center justify-between px-8 pt-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-mrl-accent text-mrl-primary text-lg font-bold">
                            M
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-mrl-primary">
                                MRL
                            </div>
                            <div className="text-[11px] text-mrl-muted">
                                Built to Move Faster
                            </div>
                        </div>
                    </div>

                    {topRightLink && (
                        <a
                            href={topRightLink.href}
                            className="text-[11px] font-medium text-mrl-info hover:underline"
                        >
                            {topRightLink.label}
                        </a>
                    )}
                </header>

                <main className="flex flex-1 flex-col justify-center px-8 py-10">
                    {children}
                </main>

                <footer className="px-8 pb-6 text-[11px] text-mrl-muted">
                    Removalist Management Software powered by MRL © 2025
                </footer>
            </div>

            {/* Right hero image */}
            <div className="relative hidden flex-1 items-center justify-center md:flex">
                <div className="absolute inset-0 bg-gradient-to-tr from-mrl-primary to-mrl-primarySoft">
                    {/* replace this with real background-image from your assets */}
                    <div className="h-full w-full bg-[url('/images/mrl-truck-hero.jpg')] bg-cover bg-center opacity-70 mix-blend-overlay" />
                </div>

                <div className="relative z-10 mx-auto max-w-md px-6 text-left text-white">
                    <p className="text-[11px] font-medium tracking-[0.25em]">
                        ONE PLATFORM FOR ALL ROAD FREIGHT
                    </p>
                    <h1 className="mt-4 text-2xl font-semibold leading-snug">
                        MRL Most Efficient
                        <br />
                        Digital Freight Network
                    </h1>
                </div>
            </div>
        </div>
    );
}
