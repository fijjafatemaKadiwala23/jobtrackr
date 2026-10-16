import { Menu } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { initials } from "@/utils/applicationHelpers";

export default function Topbar({ onMenu = () => {} }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Open menu"
        className="rounded-md p-2 text-harbor hover:bg-slate-100 lg:hidden"
      >
        <Menu size={22} />
      </button>

      <p className="hidden text-sm text-slate-600 lg:block">
        {user?.role === "employer"
          ? "Employer workspace"
          : "Job seeker workspace"}
      </p>

      <div className="flex items-center gap-3">
        <span className="hidden text-sm font-medium text-harbor sm:block">
          {user?.name}
        </span>
        <span
          aria-hidden="true"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-lagoon text-sm font-semibold text-white"
        >
          {initials(user?.name)}
        </span>
      </div>
    </header>
  );
}
