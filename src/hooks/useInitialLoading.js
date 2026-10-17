import { useEffect, useState } from "react";

// Page pehli baar khulne par kuch der "loading" True rehta hai, taaki skeleton dikhe.
// Abhi data localStorage se turant aa jata hai, isliye ye delay nakli hai (UX ke liye).
// Jab real backend jodoge, to isko apne API call ke loading state se badal dena.
export default function useInitialLoading(ms = 400) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(timer);
  }, [ms]);

  return loading;
}
