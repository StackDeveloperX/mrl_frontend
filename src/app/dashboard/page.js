// src/app/dashboard/page.tsx
import { AppShell } from "@/components/layout/AppShell";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="text-xl font-semibold text-mrl-primary">
        Dashboard Layout Verified!
      </div>
      <p className="mt-2 text-mrl-muted">Replace this with page content.</p>
    </AppShell>
  );
}
