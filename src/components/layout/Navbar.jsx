import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import ThemeToggle from "@/components/ui/ThemeToggle";

const linkClass = ({ isActive }) =>
  "text-sm font-medium transition-colors " +
  (isActive
    ? "text-lagoon"
    : "text-slate-600 hover:text-harbor dark:text-slate-300 dark:hover:text-white");

const primaryLink =
  "rounded-lg bg-lagoon px-3 py-1.5 text-sm font-medium text-white transition hover:bg-lagoon/90";

const secondaryButton =
  "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    close();
    navigate("/");
  };

  const links = (
    <>
      <NavLink to="/jobs" className={linkClass} onClick={close}>
        Browse jobs
      </NavLink>

      {user ? (
        <>
          <NavLink
            to={"/" + user.role + "/dashboard"}
            className={linkClass}
            onClick={close}
          >
            Dashboard
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className={secondaryButton}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className={linkClass} onClick={close}>
            Login
          </NavLink>

          <Link to="/signup" className={primaryLink} onClick={close}>
            Sign up
          </Link>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="font-display text-xl font-bold text-harbor dark:text-white"
        >
          JobTrackr
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {links}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            className="rounded-md p-2 text-harbor hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="flex flex-col items-start gap-4 border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden"
          aria-label="Mobile"
        >
          {links}
        </nav>
      )}
    </header>
  );
}
