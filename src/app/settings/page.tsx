"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import {
    User,
    Shield,
    KeyRound,
    Users as UsersIcon,
    IdCard,
    CreditCard,
    MapPinHouse,
    UserCog,
    Search,
    Filter,
    Plus,
} from "lucide-react";
import {
    InnerSidebar,
    type InnerSidebarIconItem,
    type InnerSidebarPillItem,
} from "@/components/layout/InnerSidebar";
import { FormModal, type FormField } from "@/components/dialogs/FormModal";

type MainSection = "userManagement" | "billings" | "branches" | "profile";
type UserSubTab = "user" | "role" | "permission" | "groups" | "staff";
type SettingsNavId =
    | "user"
    | "roles"
    | "permission"
    | "groups"
    | "staff"
    | "billings"
    | "branches"
    | "profile";

/* ---------- Modal fields for Add User ---------- */

const addUserFields: FormField[] = [
    { name: "firstName", label: "First Name", placeholder: "Enter First Name" },
    { name: "lastName", label: "Last Name", placeholder: "Enter Last Name" },
    {
        name: "phone",
        label: "Phone Number",
        placeholder: "Phone Number",
        type: "tel",
    },
    {
        name: "email",
        label: "Email Address",
        placeholder: "Email Address",
        type: "email",
    },
    {
        name: "password",
        label: "Create Password",
        placeholder: "Create New Password",
        type: "password",
    },
    {
        name: "confirmPassword",
        label: "Confirm Password",
        placeholder: "Enter New Password",
        type: "password",
    },
];

/* ---------- Sidebar config ---------- */

const iconItems: InnerSidebarIconItem[] = [
    { id: "user", label: "User", icon: User },
    { id: "roles", label: "Roles", icon: Shield },
    { id: "permission", label: "Permission", icon: KeyRound },
    { id: "groups", label: "Group", icon: UsersIcon },
    { id: "staff", label: "Staff", icon: UserCog },
];

const pillItems: InnerSidebarPillItem[] = [
    { id: "billings", label: "Billings", icon: CreditCard },
    { id: "branches", label: "Branches", icon: MapPinHouse },
    { id: "profile", label: "Profile", icon: IdCard },
];

/* ---------- Right-panel config (title, button text, columns) ---------- */

type PanelConfig = {
    id: UserSubTab;
    title: string;
    tabLabel: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    addLabel: string;
    columns: string[];
};

const USER_PANEL_CONFIGS: PanelConfig[] = [
    {
        id: "user",
        title: "User",
        tabLabel: "User",
        icon: User,
        addLabel: "Add Users",
        columns: [
            "User ID",
            "Email",
            "User Name",
            "User Type",
            "Created at",
            "Updated at",
            "Status",
        ],
    },
    {
        id: "role",
        title: "Role",
        tabLabel: "Role",
        icon: Shield,
        addLabel: "Add Roles",
        columns: [
            "Role ID",
            "Role Name",
            "Role Description",
            "User Type",
            "Created at",
            "Updated at",
            "Status",
        ],
    },
    {
        id: "permission",
        title: "Permissions",
        tabLabel: "Permissions",
        icon: KeyRound,
        addLabel: "Add Permissions",
        columns: [
            "Permission ID",
            "Permission Name",
            "Permission Description",
            "Permission Key",
            "Module",
            "Created at",
            "Updated at",
        ],
    },
    {
        id: "groups",
        title: "Permissions", // in your Figma the main title still shows "Permissions"
        tabLabel: "Groups",
        icon: UsersIcon,
        addLabel: "Add Groups",
        columns: [
            "Group ID",
            "Group Name",
            "Group Description",
            "Created at",
            "Updated at",
            "Status",
        ],
    },
    {
        id: "staff",
        title: "Permissions",
        tabLabel: "Staff",
        icon: UserCog,
        addLabel: "Add Staff",
        columns: [
            "Staff ID",
            "Staff Name",
            "Color",
            "Mobile No.",
            "Email Id",
            "Status",
        ],
    },
];

export default function SettingsPage() {
    const [mainSection, setMainSection] =
        useState<MainSection>("userManagement");
    const [userSubTab, setUserSubTab] = useState<UserSubTab>("user");
    const [activeNavId, setActiveNavId] = useState<SettingsNavId>("user");
    const [showAddUser, setShowAddUser] = useState(false);

    const activePanel =
        USER_PANEL_CONFIGS.find((cfg) => cfg.id === userSubTab) ??
        USER_PANEL_CONFIGS[0];

    /* ----- sync sidebar click with panel ----- */

    const handleChangeActive = (id: string) => {
        const navId = id as SettingsNavId;
        setActiveNavId(navId);

        switch (navId) {
            case "user":
                setMainSection("userManagement");
                setUserSubTab("user");
                break;
            case "roles":
                setMainSection("userManagement");
                setUserSubTab("role");
                break;
            case "permission":
                setMainSection("userManagement");
                setUserSubTab("permission");
                break;
            case "groups":
                setMainSection("userManagement");
                setUserSubTab("groups");
                break;
            case "staff":
                setMainSection("userManagement");
                setUserSubTab("staff");
                break;
            case "billings":
                setMainSection("billings");
                break;
            case "branches":
                setMainSection("branches");
                break;
            case "profile":
                setMainSection("profile");
                break;
        }
    };

    /* ----- Add button behaviour ----- */
    const handleClickAdd = () => {
        if (userSubTab === "user") {
            setShowAddUser(true);
        } else {
            // Later you can open other modals per tab
            console.log("Click add for", userSubTab);
        }
    };

    return (
        <AppShell>
            <div className="flex h-full gap-4">
                {/* LEFT: reusable inner sidebar */}
                <InnerSidebar
                    title="Settings"
                    iconSectionLabel="User Management"
                    iconItems={iconItems}
                    pillItems={pillItems}
                    activeId={activeNavId}
                    onChangeActive={handleChangeActive}
                />

                {/* RIGHT: panel */}
                <div className="flex min-h-[520px] flex-1 flex-col rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
                    {/* Title + tabs + toolbar (matches Figma layout) */}
                    <div className="border-b border-[#E5E7EB] px-6 pt-4 pb-3">
                        {/* Page title: User / Role / Permissions / ... */}
                        {mainSection === "userManagement" && (
                            <h2 className="mb-3 text-lg font-semibold text-[#1A2B4C]">
                                {activePanel.title}
                            </h2>
                        )}

                        {/* Tabs + toolbar row */}
                        <div className="flex items-center justify-between gap-4">
                            {/* Tabs (User / Role / Permission / Groups / Staff) */}
                            {mainSection === "userManagement" && (
                                <div className="flex flex-wrap gap-2 text-sm">
                                    {USER_PANEL_CONFIGS.map((cfg) => (
                                        <TopTab
                                            key={cfg.id}
                                            icon={cfg.icon}
                                            label={cfg.tabLabel}
                                            active={userSubTab === cfg.id}
                                            onClick={() => {
                                                setUserSubTab(cfg.id);
                                                // also sync left sidebar highlight
                                                const navIdMap: Record<UserSubTab, SettingsNavId> = {
                                                    user: "user",
                                                    role: "roles",
                                                    permission: "permission",
                                                    groups: "groups",
                                                    staff: "staff",
                                                };
                                                setActiveNavId(navIdMap[cfg.id]);
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Search + Filter + Add button */}
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="flex h-10 w-64 items-center gap-2 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-3 text-sm">
                                    <Search className="h-4 w-4 text-[#9CA3AF]" />
                                    <input
                                        placeholder="Search"
                                        className="h-full w-full bg-transparent outline-none placeholder:text-[#9CA3AF]"
                                    />
                                </div>

                                <button className="flex h-10 items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-3 text-sm text-[#374151] hover:bg-[#F3F4F6]">
                                    <Filter className="h-4 w-4" />
                                    <span>Filter</span>
                                </button>

                                <button
                                    onClick={handleClickAdd}
                                    className="flex h-10 items-center gap-2 rounded-md bg-[#1A2B4C] px-4 text-sm font-semibold text-white hover:bg-[#0f1c33]"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>{activePanel.addLabel}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table area (reusable header driven by config) */}
                    <div className="flex-1 overflow-hidden px-4 pb-4 pt-3">
                        <div className="h-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
                            {/* Table header row */}
                            <div className="flex items-center rounded-t-xl bg-[#E5E7EB] px-4 py-2 text-xs font-semibold text-[#4B5563]">
                                <div className="w-8">
                                    <input type="checkbox" className="h-4 w-4" />
                                </div>

                                {activePanel.columns.map((col, index) => (
                                    <div
                                        key={col}
                                        className={`${index === activePanel.columns.length - 1
                                            ? "w-24 text-right"
                                            : "flex-1"
                                            }`}
                                    >
                                        {col}
                                    </div>
                                ))}
                            </div>

                            {/* Empty state */}
                            <div className="flex h-[260px] items-center justify-center text-sm text-[#9CA3AF]">
                                No data found. Use “{activePanel.addLabel}” to create one.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add User popup (shown only for User tab for now) */}
            <FormModal
                open={showAddUser}
                title="Add New User"
                fields={addUserFields}
                cancelLabel="Cancel"
                submitLabel="Save"
                onClose={() => setShowAddUser(false)}
                onSubmit={(values) => {
                    console.log("Submit Add User:", values);
                    setShowAddUser(false);
                }}
            />
        </AppShell>
    );
}

/* ----- TopTab helper stays same, only styles tuned ----- */

type TopTabProps = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    active?: boolean;
    onClick?: () => void;
};

function TopTab({ icon: Icon, label, active, onClick }: TopTabProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium ${active
                ? "bg-[#DFFAF7] text-[#1A2B4C]"
                : "bg-transparent text-[#4B5563] hover:bg-[#F3F4F6]"
                }`}
        >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
        </button>
    );
}
