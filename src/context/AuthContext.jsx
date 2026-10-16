import { useState } from "react";
import { AuthContext } from "./authContextValue";
import * as authService from "@/services/authService";
import { getData, setData } from "@/services/storage";
import { KEYS } from "@/utils/constants";

// Is file se sirf component export hota hai
export function AuthProvider({ children }) {
  // Refresh karne par bhi login bana rahe, isliye session localStorage se padhte hain
  const [user, setUser] = useState(() => getData(KEYS.SESSION, null));

  const startSession = (userData) => {
    setUser(userData);
    setData(KEYS.SESSION, userData);
    return userData;
  };

  // login / signup error throw karte hain, page unhe try/catch me pakadta hai
  const login = (credentials) => startSession(authService.login(credentials));
  const signup = (formData) => startSession(authService.signup(formData));
  const updateUser = (changes) => startSession(authService.updateUser(user.id, changes));

  const logout = () => {
    setUser(null);
    localStorage.removeItem(KEYS.SESSION);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
