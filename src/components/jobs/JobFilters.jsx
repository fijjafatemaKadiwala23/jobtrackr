import { Search } from "lucide-react";
import { JOB_TYPES } from "@/utils/constants";

const SALARY_OPTIONS = [
  { value: "", label: "Any salary" },
  { value: "3", label: "3 LPA+" },
  { value: "5", label: "5 LPA+" },
  { value: "8", label: "8 LPA+" },
  { value: "12", label: "12 LPA+" },
];

const fieldClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-harbor focus:outline-none focus:ring-2 focus:ring-lagoon";

// filters = { search, location, type, minSalary }
export default function JobFilters({ filters, onChange, locations = [] }) {
  const set = (name, value) => onChange({ ...filters, [name]: value });
  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div
      role="search"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]"
    >
      <div className="relative">
        <label htmlFor="filter-search" className="sr-only">
          Search jobs
        </label>
        <Search
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          id="filter-search"
          type="search"
          value={filters.search}
          onChange={(e) => set("search", e.target.value)}
          placeholder="Title, company ya skill"
          className={fieldClass + " pl-9"}
        />
      </div>

      <div>
        <label htmlFor="filter-location" className="sr-only">
          Location
        </label>
        <select
          id="filter-location"
          value={filters.location}
          onChange={(e) => set("location", e.target.value)}
          className={fieldClass}
        >
          <option value="">All locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-type" className="sr-only">
          Job type
        </label>
        <select
          id="filter-type"
          value={filters.type}
          onChange={(e) => set("type", e.target.value)}
          className={fieldClass}
        >
          <option value="">All types</option>
          {JOB_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-salary" className="sr-only">
          Minimum salary
        </label>
        <select
          id="filter-salary"
          value={filters.minSalary}
          onChange={(e) => set("minSalary", e.target.value)}
          className={fieldClass}
        >
          {SALARY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={() =>
          onChange({ search: "", location: "", type: "", minSalary: "" })
        }
        disabled={!hasFilters}
        className="rounded-md px-3 py-2 text-sm font-medium text-lagoon transition-colors hover:bg-lagoon/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Clear
      </button>
    </div>
  );
}
