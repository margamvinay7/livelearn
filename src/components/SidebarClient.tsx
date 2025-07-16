// components/SidebarClient.tsx
"use client";

import Sidebar from "./Sidebar";
import { useAuth } from "@/context/AuthContext";

export default function SidebarClient() {
  const { user } = useAuth(); // Safe in client

  if (!user) return null;

  return (
    <div className="w-64 shrink-0">
      <Sidebar />
    </div>
  );
}
