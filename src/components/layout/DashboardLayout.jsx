import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="min-w-0 flex-1">
        <Topbar onMenu={() => setMenuOpen(true)} />
        <main className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
