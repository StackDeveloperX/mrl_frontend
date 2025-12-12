"use client";

import { useState } from "react";
import { Phone, Lock } from "lucide-react";

export default function ResetPasswordPage() {
    const [remember, setRemember] = useState(false);

    return (
        <div className="relative min-h-screen bg-[#F5F7FA] text-mrl-primary">
            <div className="grid min-h-screen md:grid-cols-2">
                {/* LEFT SIDE – FORM */}
                <div className="flex items-center justify-center bg-[#F5F7FA]">
                    <div className="w-full max-w-sm px-8 pt-20 pb-12 md:pt-28">
                        {/* Logo + heading */}
                        <div className="mb-10 flex flex-col items-center gap-2 text-center">
                            <img
                                src="/images/logo.png"
                                alt="MRL Logo"
                                className="h-16 w-auto"
                            />
                            <p className="mt-2 text-sm text-mrl-muted">Reset your password</p>
                        </div>

                        {/* Form */}
                        <form className="space-y-4">
                            {/* Mobile Number */}
                            <div className="space-y-1.5 text-sm">
                                <label className="block text-xs font-medium text-mrl-primary">
                                    Mobile Number
                                </label>
                                <div className="flex h-10 items-stretch overflow-hidden rounded-[4px] border border-[#DDDDDD] bg-white">
                                    {/* Country / Code */}
                                    <div className="flex items-center gap-1 border-r border-[#DDDDDD] bg-[#F8F8F8] px-2 text-xs text-mrl-muted">
                                        {/* flag */}
                                        <span className="h-3.5 w-5 rounded-[2px] bg-gradient-to-r from-[#00247D] via-white to-[#CF142B]" />
                                        <span className="font-medium">+61</span>
                                    </div>
                                    {/* Input */}
                                    <div className="flex flex-1 items-center gap-2 px-2">
                                        <Phone className="h-3.5 w-3.5 text-mrl-muted" />
                                        <input
                                            type="tel"
                                            className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#B0B0B0]"
                                            placeholder="Enter Mobile Number"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Create Password */}
                            <div className="space-y-1.5 text-sm">
                                <label className="block text-xs font-medium text-mrl-primary">
                                    Create Password
                                </label>
                                <div className="flex h-10 items-center gap-2 rounded-[4px] border border-[#DDDDDD] bg-white px-2">
                                    <Lock className="h-3.5 w-3.5 text-mrl-muted" />
                                    <input
                                        type="password"
                                        className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#B0B0B0]"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1.5 text-sm">
                                <label className="block text-xs font-medium text-mrl-primary">
                                    Confirm Password
                                </label>
                                <div className="flex h-10 items-center gap-2 rounded-[4px] border border-[#DDDDDD] bg-white px-2">
                                    <Lock className="h-3.5 w-3.5 text-mrl-muted" />
                                    <input
                                        type="password"
                                        className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#B0B0B0]"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* Remember My password */}
                            <button
                                type="button"
                                onClick={() => setRemember((v) => !v)}
                                className="mt-1 flex items-center gap-2 text-xs text-mrl-muted"
                            >
                                <span
                                    className={`flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border ${remember ? "border-mrl-accent bg-mrl-accent" : "border-[#C4C4C4] bg-white"
                                        }`}
                                >
                                    {remember && (
                                        <span className="h-2 w-2 rounded-[2px] bg-white" />
                                    )}
                                </span>
                                <span>Remember My password</span>
                            </button>

                            {/* Submit button */}
                            <button
                                type="submit"
                                className="mt-2 flex h-10 w-full items-center justify-center rounded-[4px] bg-mrl-accent text-sm font-semibold text-white hover:bg-[#00c4b8]"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>

                {/* RIGHT SIDE – HERO IMAGE */}
                <div className="relative hidden md:block">
                    <img
                        src="/images/loginimage.png"
                        alt="MRL Freight Truck"
                        className="h-full w-full object-cover"
                    />

                    {/* Bottom-left text overlay */}
                    <div className="absolute bottom-16 left-14 max-w-xl text-left text-white">
                        <p className="text-[11px] font-medium tracking-[0.32em]">
                            ONE PLATFORM FOR ALL ROAD FREIGHT
                        </p>
                        <h1 className="mt-4 text-3xl font-bold leading-tight">
                            MRL Most Efficient
                            <br />
                            Digital Freight Network
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
