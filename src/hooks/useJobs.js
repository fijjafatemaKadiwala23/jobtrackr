import { useContext } from "react";
import { DataContext } from "@/context/dataContextValue";

export default function useJobs() {
  return useContext(DataContext);
}
