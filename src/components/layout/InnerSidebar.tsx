"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export type InnerSidebarIconItem = {
    id: string;
    label: string;
    icon: IconType;
};

export type InnerSidebarPillItem = {
    id: string;
    label: string;
    icon?: IconType;
};

type InnerSidebarProps = {
    title: string; // "Settings"
    iconSectionLabel?: string; // "User Management"
    iconItems: InnerSidebarIconItem[];
    pillItems?: InnerSidebarPillItem[];
    activeId: string; // currently selected item id
    onChangeActive: (id: string) => void;
};

export function InnerSidebar({
    title,
    iconSectionLabel,
    iconItems,
    pillItems,
    activeId,
    onChangeActive,
}: InnerSidebarProps) {
    const [sideOpen, setSideOpen] = useState(true);

    return (
        <div
            className={`relative flex h-full flex-col rounded-xl border border-[#E5E7EB] bg-white shadow-sm transition-all duration-200 ${sideOpen ? "w-64" : "w-12"
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-3">
                {sideOpen && (
                    <span className="text-base font-semibold text-[#1A2B4C]">
                        {title}
                    </span>
                )}
                <button
                    type="button"
                    onClick={() => setSideOpen((v) => !v)}
                    className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#F5F7FA] text-[#1A2B4C] hover:bg-[#E5E7EB]"
                >
                    {sideOpen ? (
                        <ChevronLeft className="h-4 w-4" />
                    ) : (
                        <ChevronRight className="h-4 w-4" />
                    )}
                </button>
            </div>

            {/* Content */}
            {sideOpen && (
                <div className="flex flex-1 flex-col gap-4 px-4 py-4">
                    {/* Icon list section */}
                    {iconItems.length > 0 && (
                        <div>
                            {iconSectionLabel && (
                                <div className="mb-3 rounded-full bg-[#DFFAF7] px-3 py-1 text-xs font-semibold text-[#1A2B4C]">
                                    {iconSectionLabel}
                                </div>
                            )}

                            <nav className="space-y-1 text-sm">
                                {iconItems.map((item) => (
                                    <SideNavItem
                                        key={item.id}
                                        icon={item.icon}
                                        label={item.label}
                                        active={activeId === item.id}
                                        onClick={() => onChangeActive(item.id)}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}

                    {/* Pill section */}
                    {pillItems && pillItems.length > 0 && (
                        <div className="space-y-2 text-sm">
                            {pillItems.map((item) => (
                                <SidePill
                                    key={item.id}
                                    icon={item.icon}
                                    label={item.label}
                                    active={activeId === item.id}
                                    onClick={() => onChangeActive(item.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ----- local helper components used by sidebar ----- */

type SideNavItemProps = {
    icon: IconType;
    label: string;
    active?: boolean;
    onClick?: () => void;
};

function SideNavItem({ icon: Icon, label, active, onClick }: SideNavItemProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition ${active
                    ? "bg-[#0B2A42] text-white"
                    : "text-[#1A2B4C] hover:bg-[#F3F4F6]"
                }`}
        >
            <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-white">
                <Icon className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
}

type SidePillProps = {
    icon?: IconType;
    label: string;
    active?: boolean;
    onClick?: () => void;
};

function SidePill({ icon: Icon, label, active, onClick }: SidePillProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm ${active
                    ? "bg-[#0B2A42] text-white"
                    : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
                }`}
        >
            {Icon && <Icon className="h-4 w-4" />}
            <span>{label}</span>
        </button>
    );
}
