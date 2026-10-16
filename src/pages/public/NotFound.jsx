import { Link } from "react-router-dom";
import EmptyState from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <EmptyState
      title="Ye page nahi mila"
      description="Link galat ho sakta hai ya page hat gaya hai."
      action={
        <Link to="/" className="inline-block rounded-lg bg-lagoon px-4 py-2 text-sm font-medium text-white hover:bg-lagoon/90">
          Home par jao
        </Link>
      }
    />
  );
}
