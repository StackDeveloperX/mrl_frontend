"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, Lock, Loader2 } from "lucide-react";
import { authApi } from "@/apis/authApi";
import axios from "axios";
import { getTokens } from "@/lib/apiClient";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();
  const token = getTokens().access;
  const [mobileOrEmail, setMobileOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setError(null);

    if (!mobileOrEmail || !password) {
      console.log(setError("Please enter your mobile/email and password."));
      return;
    }

    try {
      setIsLoading(true);

      // NOTE: backend login expects { email, password }
      // For now we send the entered value as "email" (can be mobile/email depending on backend logic)
      await authApi.login({
        email: mobileOrEmail,
        password,
      });

      router.push("/dashboard");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please check your credentials.";
      setError(message);
      console.log("Login error:", err?.response?.data?.message);
      console.log("Login error:", err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = () => {
    if (isLoading) return;
    router.push("/auth/emaillogin");
  };

  const refreshTokens = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("new tokens", response);
    } catch (error) {
      console.log("response refresh tokens", error);
    }
  };

  // useEffect(() => {
  //   if (!token) {
  //     refreshTokens();
  //   }
  // }, []);

  return (
    <div className="relative min-h-screen bg-[#F5F7FA] text-mrl-primary">
      {/* Loading dialog overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="flex items-center gap-3 rounded-md bg-white px-4 py-3 shadow-lg">
            <Loader2 className="h-5 w-5 animate-spin text-mrl-accent" />
            <span className="text-sm font-medium text-mrl-primary">
              Logging you in...
            </span>
          </div>
        </div>
      )}

      {/* Top center link */}
      <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center text-xs text-mrl-muted">
        <div className="pointer-events-auto">
          <span>Do not have an account? </span>
          <Link
            href="/auth/register"
            className="font-semibold text-mrl-accent hover:underline"
          >
            Create One
          </Link>
        </div>
      </div>

      <div className="grid min-h-screen md:grid-cols-2">
        {/* LEFT SIDE – FORM */}
        <div className="flex items-center justify-center bg-[#F5F7FA]">
          <div className="w-full max-w-sm px-8 pt-20 pb-12 md:pt-28">
            {/* Logo */}
            <div className="mb-10 flex flex-col items-center gap-2 text-center">
              <img
                src="/images/logo.png"
                alt="MRL Logo"
                className="h-16 w-auto"
              />
              <p className="mt-2 text-sm text-mrl-muted">
                Enter your registered Email or Phone to Log In.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Mobile / Email */}
              <div className="space-y-1.5 text-sm">
                <label className="block text-xs font-medium text-mrl-primary">
                  Mobile Number
                </label>
                <div className="flex h-10 items-stretch overflow-hidden rounded-[4px] border border-[#DDDDDD] bg-white">
                  {/* Country / Code */}
                  <div className="flex items-center gap-1 border-r border-[#DDDDDD] bg-[#F8F8F8] px-2 text-xs text-mrl-muted">
                    {/* flag placeholder */}
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
                      value={mobileOrEmail}
                      onChange={(e) => setMobileOrEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5 text-sm">
                <label className="block text-xs font-medium text-mrl-primary">
                  Password
                </label>
                <div className="flex h-10 items-center gap-2 rounded-[4px] border border-[#DDDDDD] bg-white px-2">
                  <Lock className="h-3.5 w-3.5 text-mrl-muted" />
                  <input
                    type="password"
                    className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#B0B0B0]"
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="mt-1 text-right">
                  <Link
                    href="/auth/reset-password"
                    className="text-xs font-medium text-mrl-accent hover:underline"
                  >
                    Forget your password?
                  </Link>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-xs font-medium text-red-500">{error}</p>
              )}

              {/* Login button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex h-10 w-full items-center justify-center rounded-[4px] bg-mrl-accent text-sm font-semibold text-white hover:bg-[#00c4b8] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>

              {/* <button className="bg-amber-200" onClick={refreshTokens}>button</button> */}

              {/* OR separator */}
              <div className="flex items-center gap-3 text-[11px] text-mrl-muted">
                <span className="h-px flex-1 bg-[#D9D9D9]" />
                <span>OR</span>
                <span className="h-px flex-1 bg-[#D9D9D9]" />
              </div>

              {/* Continue with Email */}
              <button
                type="button"
                onClick={handleEmailLogin}
                disabled={isLoading}
                className="flex h-10 w-full items-center justify-center rounded-[4px] border border-[#DDDDDD] bg-white text-sm font-medium text-mrl-primary hover:bg-[#F4F5F7] disabled:cursor-not-allowed disabled:opacity-70"
              >
                Continue with Email
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

// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Phone, Lock } from "lucide-react";

// export default function LoginPage() {
//     const router = useRouter();

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         // TEMP: go to dashboard
//         router.push("/dashboard");
//     };

//     const handleEmailLogin = () => {
//         router.push("/auth/emaillogin");
//     };

//     return (
//         <div className="relative min-h-screen bg-[#F5F7FA] text-mrl-primary">
//             {/* Top center link */}
//             <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center text-xs text-mrl-muted">
//                 <div className="pointer-events-auto">
//                     <span>Do not have an account? </span>
//                     <Link
//                         href="/auth/register"
//                         className="font-semibold text-mrl-accent hover:underline"
//                     >
//                         Create One
//                     </Link>
//                 </div>
//             </div>

//             <div className="grid min-h-screen md:grid-cols-2">
//                 {/* LEFT SIDE – FORM */}
//                 <div className="flex items-center justify-center bg-[#F5F7FA]">
//                     <div className="w-full max-w-sm px-8 pt-20 pb-12 md:pt-28">
//                         {/* Logo */}
//                         <div className="mb-10 flex flex-col items-center gap-2 text-center">
//                             <img
//                                 src="/images/logo.png"
//                                 alt="MRL Logo"
//                                 className="h-16 w-auto"
//                             />
//                             <p className="mt-2 text-sm text-mrl-muted">
//                                 Enter your registered Email or Phone to Log In.
//                             </p>
//                         </div>

//                         {/* Form */}
//                         <form className="space-y-4" onSubmit={handleSubmit}>
//                             {/* Mobile Number */}
//                             <div className="space-y-1.5 text-sm">
//                                 <label className="block text-xs font-medium text-mrl-primary">
//                                     Mobile Number
//                                 </label>
//                                 <div className="flex h-10 items-stretch overflow-hidden rounded-[4px] border border-[#DDDDDD] bg-white">
//                                     {/* Country / Code */}
//                                     <div className="flex items-center gap-1 border-r border-[#DDDDDD] bg-[#F8F8F8] px-2 text-xs text-mrl-muted">
//                                         {/* flag placeholder */}
//                                         <span className="h-3.5 w-5 rounded-[2px] bg-gradient-to-r from-[#00247D] via-white to-[#CF142B]" />
//                                         <span className="font-medium">+61</span>
//                                     </div>
//                                     {/* Input */}
//                                     <div className="flex flex-1 items-center gap-2 px-2">
//                                         <Phone className="h-3.5 w-3.5 text-mrl-muted" />
//                                         <input
//                                             type="tel"
//                                             className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#B0B0B0]"
//                                             placeholder="Enter Mobile Number"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Password */}
//                             <div className="space-y-1.5 text-sm">
//                                 <label className="block text-xs font-medium text-mrl-primary">
//                                     Password
//                                 </label>
//                                 <div className="flex h-10 items-center gap-2 rounded-[4px] border border-[#DDDDDD] bg-white px-2">
//                                     <Lock className="h-3.5 w-3.5 text-mrl-muted" />
//                                     <input
//                                         type="password"
//                                         className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#B0B0B0]"
//                                         placeholder=""
//                                     />
//                                 </div>
//                                 <div className="mt-1 text-right">
//                                     <Link
//                                         href="/auth/reset-password"
//                                         className="text-xs font-medium text-mrl-accent hover:underline"
//                                     >
//                                         Forget your password?
//                                     </Link>
//                                 </div>
//                             </div>

//                             {/* Login button */}
//                             <button
//                                 type="submit"
//                                 className="mt-2 flex h-10 w-full items-center justify-center rounded-[4px] bg-mrl-accent text-sm font-semibold text-white hover:bg-[#00c4b8]"
//                             >
//                                 Login
//                             </button>

//                             {/* OR separator */}
//                             <div className="flex items-center gap-3 text-[11px] text-mrl-muted">
//                                 <span className="h-px flex-1 bg-[#D9D9D9]" />
//                                 <span>OR</span>
//                                 <span className="h-px flex-1 bg-[#D9D9D9]" />
//                             </div>

//                             {/* Continue with Email */}
//                             <button
//                                 type="button"
//                                 onClick={handleEmailLogin}
//                                 className="flex h-10 w-full items-center justify-center rounded-[4px] border border-[#DDDDDD] bg-white text-sm font-medium text-mrl-primary hover:bg-[#F4F5F7]"
//                             >
//                                 Continue with Email
//                             </button>
//                         </form>
//                     </div>
//                 </div>

//                 {/* RIGHT SIDE – HERO IMAGE */}
//                 <div className="relative hidden md:block">
//                     <img
//                         src="/images/loginimage.png"
//                         alt="MRL Freight Truck"
//                         className="h-full w-full object-cover"
//                     />

//                     {/* Bottom-left text overlay */}
//                     <div className="absolute bottom-16 left-14 max-w-xl text-left text-white">
//                         <p className="text-[11px] font-medium tracking-[0.32em]">
//                             ONE PLATFORM FOR ALL ROAD FREIGHT
//                         </p>
//                         <h1 className="mt-4 text-3xl font-bold leading-tight">
//                             MRL Most Efficient
//                             <br />
//                             Digital Freight Network
//                         </h1>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
