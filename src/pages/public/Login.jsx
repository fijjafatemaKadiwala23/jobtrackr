import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import AuthShell from "@/components/layout/AuthShell";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEMO = {
  seeker: { email: "seeker@demo.com", password: "1234" },
  employer: { email: "employer@demo.com", password: "1234" },
};

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Pehle se login hai to login page dikhane ka matlab nahi
  if (user) return <Navigate to={"/" + user.role + "/dashboard"} replace />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const next = {};
    if (!EMAIL_REGEX.test(form.email.trim())) next.email = "Sahi email daalo.";
    if (!form.password) next.password = "Password daalo.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const loggedIn = login(form);
      toast.success("Welcome back, " + loggedIn.name.split(" ")[0]);
      navigate("/" + loggedIn.role + "/dashboard", { replace: true });
    } catch (err) {
      setServerError(err.message);
    }
  };

  const fillDemo = (role) => {
    setForm(DEMO[role]);
    setErrors({});
    setServerError("");
  };

  return (
    <AuthShell
      title="Login"
      subtitle="Apne account me wapas aao."
      footer={
        <>
          Account nahi hai?{" "}
          <Link to="/signup" className="font-medium text-lagoon hover:underline">
            Signup karo
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {serverError && (
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {serverError}
          </p>
        )}

        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Apna password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>

      {/* Demo accounts: portfolio dekhne wale ke liye */}
      <div className="mt-6 rounded-lg border border-dashed border-slate-300 p-3">
        <p className="text-xs text-slate-500">Demo account se try karo (password: 1234)</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={() => fillDemo("seeker")}>
            Job seeker
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={() => fillDemo("employer")}>
            Employer
          </Button>
        </div>
      </div>
    </AuthShell>
  );
}
