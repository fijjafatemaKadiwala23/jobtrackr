import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Bookmark,
  Briefcase,
  Building2,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  User,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";

const MENUS = {
  seeker: [
    { to: "/seeker/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/jobs", label: "Browse jobs", icon: Search },
    {
      to: "/seeker/applications",
      label: "My applications",
      icon: ClipboardList,
    },
    { to: "/seeker/saved", label: "Saved jobs", icon: Bookmark },
    { to: "/seeker/profile", label: "Profile", icon: User },
  ],
  employer: [
    { to: "/employer/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/employer/jobs", label: "My jobs", icon: Briefcase },
    { to: "/employer/jobs/new", label: "Post a job", icon: Plus },
    { to: "/employer/company", label: "Company profile", icon: Building2 },
  ],
};

export default function Sidebar({ open = false, onClose = () => {} }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const items = MENUS[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-harbor text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:self-start " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="px-6 py-5">
          <Link
            to="/"
            className="font-display text-xl font-bold"
            onClick={onClose}
          >
            JobTrackr
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3" aria-label="Dashboard">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              onClick={onClose}
              className={({ isActive }) =>
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors " +
                (isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white")
              }
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <p className="truncate text-sm font-medium">{user?.name}</p>
          <p className="mb-3 truncate text-xs text-white/60">{user?.email}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut size={16} aria-hidden="true" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
