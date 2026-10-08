"use client";

import { useState } from "react";
import SideNavbar from "@/components/SideNavbar";
import SearchNavbar from "@/components/SearchNavbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
<div className="app-layout">
  <SearchNavbar
    onMenuClick={() => setSidebarOpen((open) => !open)}
    menuOpen={sidebarOpen}
  />

  <SideNavbar
    isOpen={sidebarOpen}
    onClose={() => setSidebarOpen(false)}
  />

  <main className="app-layout__content">{children}</main>
</div>
  );
}
