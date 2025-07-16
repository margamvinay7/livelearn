// app/mainlayout.tsx
import SidebarClient from "@/components/SidebarClient";
import type { ReactNode } from "react";


export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar — client-aware */}
      <SidebarClient/>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        {children}
      </main>
    </div>
  );
}
