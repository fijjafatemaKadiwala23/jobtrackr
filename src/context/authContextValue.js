import { createContext } from "react";

// Sirf context object yahan rehta hai (component nahi), isliye Fast Refresh warning nahi aati
export const AuthContext = createContext(null);
