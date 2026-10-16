import { useContext } from "react";
import { DataContext } from "@/context/dataContextValue";

export default function useApplications() {
  return useContext(DataContext);
}
