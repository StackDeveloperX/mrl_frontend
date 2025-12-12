"use client";

import { useState } from "react";
import { AuthShell } from "@/components/layout/AuthShell";
import { Lock, Phone } from "lucide-react";

export default function RegisterPage() {
    const [remember, setRemember] = useState(false);

    return (
        <AuthShell
            topRightLink={{
                href: "/auth/login",
                label: "Already have an account? Go to Log In",
            }}
        >
            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-semibold text-mrl-primary">
                        Create your account
                    </h2>
                    <p className="mt-1 text-sm text-mrl-muted">
                        Enter your registered Email or Phone to create account.
                    </p>
                </div>

                <form className="space-y-4">
                    {/* Mobile Number */}
                    <div className="space-y-1.5 text-sm">
                        <label className="block text-xs font-medium text-mrl-muted">
                            Mobile Number
                        </label>
                        <div className="flex rounded-md border border-mrl-border bg-mrl-pageBg text-sm">
                            <div className="flex items-center gap-1 border-r border-mrl-border bg-mrl-card px-2 text-xs text-mrl-muted">
                                <span className="rounded bg-mrl-pageBg px-1 py-0.5 text-[10px]">
                                    +61
                                </span>
                            </div>
                            <div className="flex flex-1 items-center gap-2 px-2">
                                <Phone className="h-3.5 w-3.5 text-mrl-muted" />
                                <input
                                    type="tel"
                                    className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-mrl-muted/60"
                                    placeholder="Enter Mobile Number"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Create Password */}
                    <div className="space-y-1.5 text-sm">
                        <label className="block text-xs font-medium text-mrl-muted">
                            Create Password
                        </label>
                        <div className="flex items-center gap-2 rounded-md border border-mrl-border bg-mrl-pageBg px-2">
                            <Lock className="h-3.5 w-3.5 text-mrl-muted" />
                            <input
                                type="password"
                                className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-mrl-muted/60"
                                placeholder="Create Password"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5 text-sm">
                        <label className="block text-xs font-medium text-mrl-muted">
                            Confirm Password
                        </label>
                        <div className="flex items-center gap-2 rounded-md border border-mrl-border bg-mrl-pageBg px-2">
                            <Lock className="h-3.5 w-3.5 text-mrl-muted" />
                            <input
                                type="password"
                                className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-mrl-muted/60"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>

                    {/* Remember */}
                    <button
                        type="button"
                        className="flex items-center gap-2 text-xs text-mrl-muted"
                        onClick={() => setRemember((v) => !v)}
                    >
                        <span
                            className={`flex h-3.5 w-3.5 items-center justify-center rounded-[4px] border ${remember
                                ? "border-mrl-accent bg-mrl-accent"
                                : "border-mrl-border bg-white"
                                }`}
                        >
                            {remember && (
                                <span className="h-2 w-2 rounded-[2px] bg-mrl-primary" />
                            )}
                        </span>
                        <span>Remember my password</span>
                    </button>

                    {/* Next */}
                    <button
                        type="submit"
                        className="mt-1 flex h-9 w-full items-center justify-center rounded-md bg-mrl-accent text-sm font-medium text-mrl-primary hover:bg-mrl-accentSoft"
                    >
                        Next
                    </button>

                    {/* OR / Continue with Email */}
                    <div className="space-y-3 pt-1">
                        <div className="flex items-center gap-3 text-[11px] text-mrl-muted">
                            <span className="h-px flex-1 bg-mrl-border" />
                            <span>OR</span>
                            <span className="h-px flex-1 bg-mrl-border" />
                        </div>
                        <button
                            type="button"
                            className="flex h-9 w-full items-center justify-center rounded-md border border-mrl-border bg-mrl-card text-sm font-medium text-mrl-primary hover:bg-mrl-highlightBg"
                        >
                            Continue with Email
                        </button>
                    </div>
                </form>
            </div>
        </AuthShell>
    );
}
