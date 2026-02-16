"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/app/Admin/components/Navbar";
import { Header } from "@/components/header";
import LiveMovingPolls from "@/components/RenderingPolls";
import { useAuth } from "./Admin/AuthContext";


export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
const { isAdmin, loading } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

useEffect(() => {
  if (loading) return;

  const isVotePage = /^\/Admin\/vote\/\d+$/i.test(pathname);
  const isLoginPage = pathname === "/Admin/Login";

  if (!isAdmin && pathname.startsWith("/Admin") && !isVotePage && !isLoginPage) {
    router.replace("/");
  }

}, [loading, isAdmin, pathname, router]);


  if (isAdmin === null) return null;

  const hideNavbarOnLogin = pathname === "/Admin/Login";

  return (
<main>
      {isAdmin && !hideNavbarOnLogin && pathname.startsWith("/Admin") ? (
        <Navbar />
      ) : (
  !pathname.startsWith("/Admin") && <Header />
      )}
     
      {children}
 <LiveMovingPolls />
      </main>


  );
}
