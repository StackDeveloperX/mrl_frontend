import Image from "next/image";
import DashboardPage from "./dashboard/page";
import LoginPage from "./auth/login/page";

export default function Home() {
  return (
    <div className="">
      <LoginPage />
    </div>
  );
}
