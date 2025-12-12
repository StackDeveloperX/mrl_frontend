// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // when user hits "/", send them to the login page
  redirect("/auth/login");
}



// import { AppShell } from "@/components/layout/AppShell";

// export default function DashboardPage() {
//   return (
//     <AppShell>
//       <div className="text-xl font-semibold text-mrl-primary">
//         Dashboard Layout Verified!
//       </div>
//       <p className="mt-2 text-mrl-muted">
//         Replace this with page content.
//       </p>
//     </AppShell>
//   );
// }
