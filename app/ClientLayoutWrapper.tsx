"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/app/Admin/components/Navbar";
import { Header } from "@/components/header";


export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isVotePage = /^\/Admin\/vote\/\d+$/i.test(pathname);
  const isLoginPage = pathname === "/Admin/Login";
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);

    if (adminStatus && (pathname === "/" || pathname === "/Admin")) {
      router.replace("/Admin");
    }
    if (!adminStatus && pathname.startsWith("/Admin") && !isVotePage && !isLoginPage) {
      router.replace("/Admin/Login");
    }
 if (adminStatus && (pathname === "/" || isLoginPage)) {
      router.replace("/Admin");
    }
  }, [pathname, router]);

  if (isAdmin === null) return null;

  const hideNavbarOnLogin = pathname === "/Admin/Login";

  return (
    <>
      {isAdmin && !hideNavbarOnLogin && pathname.startsWith("/Admin") ? (
        <Navbar />
      ) : (
  !pathname.startsWith("/Admin") && <Header />
      )}

      <main>{children}</main>

    </>
  );
}
