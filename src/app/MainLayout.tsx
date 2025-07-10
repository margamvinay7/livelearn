"use client";
// import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
//   const { user } = useAuth();
  return (
    <>
    <Sidebar/>
        <div className="w-full">{children}</div>
  
    </>
  );
} 