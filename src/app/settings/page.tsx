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
  Loader2,
  Pencil,
} from "lucide-react";
import {
  InnerSidebar,
  type InnerSidebarIconItem,
  type InnerSidebarPillItem,
} from "@/components/layout/InnerSidebar";
import { FormModal, type FormField } from "@/components/dialogs/FormModal";
import { usersApi, type User as ApiUser } from "@/apis/usersApi";

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

/* ---------- Modal fields ---------- */

const addUserFields: FormField[] = [
  { name: "firstName", label: "First Name", placeholder: "Enter First Name" },
  { name: "lastName", label: "Last Name", placeholder: "Enter Last Name" },
  { name: "email", label: "Email Address", placeholder: "Email Address", type: "email" },
];

const editUserFields: FormField[] = [
  { name: "firstName", label: "First Name", placeholder: "Enter First Name" },
  { name: "lastName", label: "Last Name", placeholder: "Enter Last Name" },
  { name: "email", label: "Email Address", placeholder: "Email Address", type: "email" },
  { name: "status", label: "Status (active/inactive/pending)", placeholder: "active" },
  { name: "userType", label: "User Type (employee/client)", placeholder: "employee" },
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

/* ---------- Right-panel config ---------- */

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
    columns: ["User ID", "Email", "User Name", "User Type", "Created at", "Updated at", "Status"],
  },
  {
    id: "role",
    title: "Role",
    tabLabel: "Role",
    icon: Shield,
    addLabel: "Add Roles",
    columns: ["Role ID", "Role Name", "Role Description", "User Type", "Created at", "Updated at", "Status"],
  },
  {
    id: "permission",
    title: "Permissions",
    tabLabel: "Permissions",
    icon: KeyRound,
    addLabel: "Add Permissions",
    columns: ["Permission ID", "Permission Name", "Permission Description", "Permission Key", "Module", "Created at", "Updated at"],
  },
  {
    id: "groups",
    title: "Permissions",
    tabLabel: "Groups",
    icon: UsersIcon,
    addLabel: "Add Groups",
    columns: ["Group ID", "Group Name", "Group Description", "Created at", "Updated at", "Status"],
  },
  {
    id: "staff",
    title: "Permissions",
    tabLabel: "Staff",
    icon: UserCog,
    addLabel: "Add Staff",
    columns: ["Staff ID", "Staff Name", "Color", "Mobile No.", "Email Id", "Status"],
  },
];

export default function SettingsPage() {
  const [mainSection, setMainSection] = useState<MainSection>("userManagement");
  const [userSubTab, setUserSubTab] = useState<UserSubTab>("user");
  const [activeNavId, setActiveNavId] = useState<SettingsNavId>("user");

  // Add modal
  const [showAddUser, setShowAddUser] = useState(false);
  const [isSavingUser, setIsSavingUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);

  // Edit modal (get + update)
  const [showEditUser, setShowEditUser] = useState(false);
  const [editUserId, setEditUserId] = useState<string>(""); // input id for now
  const [editingUser, setEditingUser] = useState<ApiUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const activePanel =
    USER_PANEL_CONFIGS.find((cfg) => cfg.id === userSubTab) ?? USER_PANEL_CONFIGS[0];

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

  const handleClickAdd = () => {
    if (userSubTab === "user") {
      setUserError(null);
      setShowAddUser(true);
    } else {
      console.log("Click add for", userSubTab);
    }
  };

  const openEditUser = async () => {
    if (!editUserId) {
      setUserError("Enter a User ID to load.");
      return;
    }

    try {
      setUserError(null);
      setIsLoadingUser(true);

      const user = await usersApi.getById(editUserId);
      setEditingUser(user);
      setShowEditUser(true);
    } catch (err: any) {
      setUserError(err?.response?.data?.message || "Failed to load user.");
    } finally {
      setIsLoadingUser(false);
    }
  };

  return (
    <AppShell>
      <div className="flex h-full gap-4">
        <InnerSidebar
          title="Settings"
          iconSectionLabel="User Management"
          iconItems={iconItems}
          pillItems={pillItems}
          activeId={activeNavId}
          onChangeActive={handleChangeActive}
        />

        <div className="flex min-h-[520px] flex-1 flex-col rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
          <div className="border-b border-[#E5E7EB] px-6 pt-4 pb-3">
            {mainSection === "userManagement" && (
              <h2 className="mb-3 text-lg font-semibold text-[#1A2B4C]">
                {activePanel.title}
              </h2>
            )}

            <div className="flex items-center justify-between gap-4">
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

                {/* Simple "Edit User" test button for get+update flow */}
                {userSubTab === "user" && (
                  <div className="flex h-10 items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-3">
                    <input
                      value={editUserId}
                      onChange={(e) => setEditUserId(e.target.value)}
                      placeholder="User ID"
                      className="h-full w-24 bg-transparent text-sm outline-none placeholder:text-[#9CA3AF]"
                    />
                    <button
                      onClick={openEditUser}
                      className="flex items-center gap-2 text-sm font-medium text-[#1A2B4C] hover:underline"
                      disabled={isLoadingUser}
                    >
                      {isLoadingUser ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" /> Loading
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Pencil className="h-4 w-4" /> Edit
                        </span>
                      )}
                    </button>
                  </div>
                )}

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

          <div className="flex-1 overflow-hidden px-4 pb-4 pt-3">
            <div className="h-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
              <div className="flex items-center rounded-t-xl bg-[#E5E7EB] px-4 py-2 text-xs font-semibold text-[#4B5563]">
                <div className="w-8">
                  <input type="checkbox" className="h-4 w-4" />
                </div>

                {activePanel.columns.map((col, index) => (
                  <div
                    key={col}
                    className={
                      index === activePanel.columns.length - 1
                        ? "w-24 text-right"
                        : "flex-1"
                    }
                  >
                    {col}
                  </div>
                ))}
              </div>

              <div className="flex h-[260px] flex-col items-center justify-center gap-2 text-sm text-[#9CA3AF]">
                <div>No data found. Use “{activePanel.addLabel}” to create one.</div>
                {userError ? <div className="text-red-500">{userError}</div> : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add User (POST /users) */}
      <FormModal
        open={showAddUser}
        title="Add New User"
        fields={addUserFields}
        cancelLabel="Cancel"
        submitLabel="Save"
        errorText={userError}
        onClose={() => {
          if (!isSavingUser) {
            setUserError(null);
            setShowAddUser(false);
          }
        }}
        onSubmit={async (values) => {
          setUserError(null);

          if (!values.firstName || !values.email) {
            setUserError("First name and email are required.");
            return;
          }

          try {
            setIsSavingUser(true);

            await usersApi.create({
              first_name: values.firstName,
              last_name: values.lastName,
              email: values.email,
              user_type: "employee",
              status: "active",
            });

            setShowAddUser(false);
          } catch (err: any) {
            setUserError(err?.response?.data?.message || "Failed to create user.");
          } finally {
            setIsSavingUser(false);
          }
        }}
      />

      {/* Edit User (GET /users/{id} then PUT /users/{id}) */}
      <FormModal
        open={showEditUser}
        title={`Edit User${editingUser ? ` #${editingUser.id}` : ""}`}
        fields={editUserFields}
        cancelLabel="Cancel"
        submitLabel="Update"
        errorText={userError}
        initialValues={
          editingUser
            ? {
                firstName: editingUser.first_name ?? "",
                lastName: editingUser.last_name ?? "",
                email: editingUser.email ?? "",
                status: editingUser.status ?? "active",
                userType: editingUser.user_type ?? "employee",
              }
            : undefined
        }
        onClose={() => {
          if (!isSavingUser) {
            setUserError(null);
            setShowEditUser(false);
            setEditingUser(null);
          }
        }}
        onSubmit={async (values) => {
          if (!editingUser) return;

          setUserError(null);

          try {
            setIsSavingUser(true);

            await usersApi.update(editingUser.id, {
              first_name: values.firstName,
              last_name: values.lastName,
              // email is usually not updateable; if your backend allows it, add it in UserUpdate DTO
              status: (values.status as any) || "active",
              user_type: (values.userType as any) || "employee",
            });

            setShowEditUser(false);
            setEditingUser(null);
          } catch (err: any) {
            setUserError(err?.response?.data?.message || "Failed to update user.");
          } finally {
            setIsSavingUser(false);
          }
        }}
      />

      {/* Global loading overlay */}
      {isSavingUser && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
          <div className="flex items-center gap-3 rounded-md bg-white px-5 py-3 shadow-lg">
            <Loader2 className="h-5 w-5 animate-spin text-[#1A2B4C]" />
            <span className="text-sm font-medium text-[#1A2B4C]">Saving user...</span>
          </div>
        </div>
      )}
    </AppShell>
  );
}

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
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium ${
        active ? "bg-[#DFFAF7] text-[#1A2B4C]" : "bg-transparent text-[#4B5563] hover:bg-[#F3F4F6]"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
