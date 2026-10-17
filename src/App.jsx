import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AppRoutes from "@/routes/AppRoutes";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
          <Toaster position="top-right" />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
