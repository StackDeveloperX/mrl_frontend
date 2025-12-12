// src/app/dashboard/settings/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";

import {
  InnerSidebar,
  type InnerSidebarIconItem,
  type InnerSidebarPillItem,
} from "@/components/layout/InnerSidebar";

import { FormModal, type FormField } from "@/components/dialogs/FormModal";
import { employeesApi } from "@/apis/employeesApi";
import { clientsApi } from "@/apis/clientsApi";

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
    columns: ["ID", "Email", "Name", "Type", "Status"],
  },
  {
    id: "role",
    title: "Role",
    tabLabel: "Role",
    icon: Shield,
    addLabel: "Add Roles",
    columns: ["Role ID", "Role Name", "Status"],
  },
  {
    id: "permission",
    title: "Permissions",
    tabLabel: "Permissions",
    icon: KeyRound,
    addLabel: "Add Permissions",
    columns: ["Permission ID", "Name", "Key", "Module"],
  },
  {
    id: "groups",
    title: "Permissions",
    tabLabel: "Groups",
    icon: UsersIcon,
    addLabel: "Add Groups",
    columns: ["Group ID", "Group Name", "Status"],
  },
  {
    id: "staff",
    title: "Permissions",
    tabLabel: "Staff",
    icon: UserCog,
    addLabel: "Add Staff",
    columns: ["Staff ID", "Staff Name", "Email", "Status"],
  },
];

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

// ✅ Add User modal fields (now includes userType select)
const addUserFields: FormField[] = [
  {
    name: "userType",
    label: "User Type",
    type: "select",
    options: [
      { label: "Employee", value: "employee" },
      { label: "Client", value: "client" },
    ],
  },
  { name: "firstName", label: "First Name", placeholder: "Enter First Name" },
  { name: "lastName", label: "Last Name", placeholder: "Enter Last Name" },
  { name: "phone", label: "Phone", placeholder: "Phone", type: "tel" },
  { name: "email", label: "Email", placeholder: "Email", type: "email" },
  { name: "password", label: "Password", placeholder: "Min 8 chars", type: "password" },
  { name: "confirmPassword", label: "Confirm Password", placeholder: "Confirm", type: "password" },

  // Client-only extras (optional)
  { name: "companyName", label: "Company Name (Client)", placeholder: "Company Name" },
  { name: "contactPerson", label: "Contact Person (Client)", placeholder: "Contact Person" },
  { name: "address", label: "Address (Client)", placeholder: "Address" },
  { name: "city", label: "City (Client)", placeholder: "City" },
  { name: "state", label: "State (Client)", placeholder: "State" },
  { name: "postcode", label: "Postcode (Client)", placeholder: "Postcode" },

  // Employee-only extras (optional)
  { name: "position", label: "Position (Employee)", placeholder: "Position" },
  { name: "department", label: "Department (Employee)", placeholder: "Department" },
  { name: "hireDate", label: "Hire Date (Employee)", placeholder: "YYYY-MM-DD" },
];

export default function SettingsPage() {
  const [mainSection, setMainSection] = useState<MainSection>("userManagement");
  const [userSubTab, setUserSubTab] = useState<UserSubTab>("user");
  const [activeNavId, setActiveNavId] = useState<SettingsNavId>("user");
  const [showAddUser, setShowAddUser] = useState(false);

  const [isSavingUser, setIsSavingUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);

  // simple list demo (employees/clients based on selected filter)
  const [userListType, setUserListType] = useState<"employee" | "client">("employee");
  const [rows, setRows] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(false);

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
    if (userSubTab === "user") setShowAddUser(true);
    else console.log("Click add for", userSubTab);
  };

  // ✅ list users (employees or clients)
  useEffect(() => {
    if (mainSection !== "userManagement" || userSubTab !== "user") return;

    (async () => {
      try {
        setLoadingList(true);
        if (userListType === "employee") {
          const data = await employeesApi.list();
          setRows(data);
        } else {
          const data = await clientsApi.list();
          setRows(data);
        }
      } catch (e) {
        setRows([]);
      } finally {
        setLoadingList(false);
      }
    })();
  }, [mainSection, userSubTab, userListType]);

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
              <h2 className="mb-3 text-lg font-semibold text-[#1A2B4C]">{activePanel.title}</h2>
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
                {/* ✅ simple list type toggle only on User tab */}
                {mainSection === "userManagement" && userSubTab === "user" && (
                  <select
                    value={userListType}
                    onChange={(e) => setUserListType(e.target.value as any)}
                    className="h-10 rounded-md border border-[#E5E7EB] bg-white px-3 text-sm"
                  >
                    <option value="employee">Employees</option>
                    <option value="client">Clients</option>
                  </select>
                )}

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

          <div className="flex-1 overflow-hidden px-4 pb-4 pt-3">
            <div className="h-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
              <div className="flex items-center rounded-t-xl bg-[#E5E7EB] px-4 py-2 text-xs font-semibold text-[#4B5563]">
                <div className="w-8">
                  <input type="checkbox" className="h-4 w-4" />
                </div>

                {activePanel.columns.map((col, index) => (
                  <div
                    key={col}
                    className={index === activePanel.columns.length - 1 ? "w-24 text-right" : "flex-1"}
                  >
                    {col}
                  </div>
                ))}
              </div>

              {loadingList ? (
                <div className="flex h-[260px] items-center justify-center text-sm text-[#6B7280]">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : rows.length === 0 ? (
                <div className="flex h-[260px] items-center justify-center text-sm text-[#9CA3AF]">
                  No data found. Use “{activePanel.addLabel}” to create one.
                </div>
              ) : (
                <div className="divide-y divide-[#E5E7EB]">
                  {rows.slice(0, 15).map((r: any) => (
                    <div key={r.id} className="flex items-center px-4 py-2 text-sm text-[#111827]">
                      <div className="w-8">
                        <input type="checkbox" className="h-4 w-4" />
                      </div>

                      <div className="flex-1">{r.id}</div>
                      <div className="flex-1">{r.email ?? "-"}</div>
                      <div className="flex-1">{`${r.first_name ?? ""} ${r.last_name ?? ""}`.trim()}</div>
                      <div className="flex-1">{userListType}</div>
                      <div className="w-24 text-right">{String(r.is_active ?? r.status ?? "-")}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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

          const userType = (values.userType as "employee" | "client") ?? "employee";

          // Required fields for both employee/client create: email, first_name, password
          if (!values.firstName?.trim()) {
            setUserError("First name is required.");
            return;
          }
          if (!values.email?.trim()) {
            setUserError("Email is required.");
            return;
          }
          if (!values.password || values.password.length < 8) {
            setUserError("Password must be at least 8 characters.");
            return;
          }
          if (values.password !== values.confirmPassword) {
            setUserError("Password and Confirm Password do not match.");
            return;
          }

          try {
            setIsSavingUser(true);

            if (userType === "employee") {
              await employeesApi.create({
                email: values.email.trim(),
                first_name: values.firstName.trim(),
                last_name: values.lastName?.trim() || undefined,
                password: values.password,

                phone: values.phone?.trim() || undefined,
                position: values.position?.trim() || undefined,
                department: values.department?.trim() || undefined,
                hire_date: values.hireDate?.trim() || undefined,
              });
              setUserListType("employee");
            } else {
              await clientsApi.create({
                email: values.email.trim(),
                first_name: values.firstName.trim(),
                last_name: values.lastName?.trim() || undefined,
                password: values.password,

                phone: values.phone?.trim() || undefined,
                company_name: values.companyName?.trim() || undefined,
                contact_person: values.contactPerson?.trim() || undefined,
                address: values.address?.trim() || undefined,
                city: values.city?.trim() || undefined,
                state: values.state?.trim() || undefined,
                postcode: values.postcode?.trim() || undefined,
              });
              setUserListType("client");
            }

            setShowAddUser(false);
            setUserError(null);

            // refresh list
            if (userType === "employee") setRows(await employeesApi.list());
            else setRows(await clientsApi.list());
          } catch (err: any) {
            setUserError(
              err?.response?.data?.message ||
                err?.message ||
                "Failed to create user. Please try again."
            );
          } finally {
            setIsSavingUser(false);
          }
        }}
      />

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
