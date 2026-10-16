import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import AuthShell from "@/components/layout/AuthShell";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ROLE_OPTIONS = [
  { value: "seeker", title: "Job seeker", desc: "Jobs dhundo aur applications track karo" },
  { value: "employer", title: "Employer", desc: "Jobs post karo aur candidates manage karo" },
];

export default function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // /signup?role=employer se role pehle se select ho jayega
  const initialRole = params.get("role") === "employer" ? "employer" : "seeker";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: initialRole,
    companyName: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  if (user) return <Navigate to={"/" + user.role + "/dashboard"} replace />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Naam kam se kam 2 letters ka ho.";
    if (!EMAIL_REGEX.test(form.email.trim())) next.email = "Sahi email daalo.";
    if (form.password.length < 6) next.password = "Password kam se kam 6 characters ka ho.";
    if (form.confirmPassword !== form.password) next.confirmPassword = "Dono password same hone chahiye.";
    if (form.role === "employer" && !form.companyName.trim()) next.companyName = "Company ka naam daalo.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const created = signup(form);
      toast.success("Account ban gaya. Welcome, " + created.name.split(" ")[0] + "!");
      navigate("/" + created.role + "/dashboard", { replace: true });
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <AuthShell
      title="Account banao"
      subtitle="2 minute me shuru karo."
      footer={
        <>
          Pehle se account hai?{" "}
          <Link to="/login" className="font-medium text-lagoon hover:underline">
            Login karo
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

        {/* Role selector: asli radio inputs, keyboard se bhi chalte hain */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-harbor">Main hoon</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {ROLE_OPTIONS.map((option) => {
              const selected = form.role === option.value;
              return (
                <label
                  key={option.value}
                  className={
                    "cursor-pointer rounded-lg border p-3 transition focus-within:ring-2 focus-within:ring-lagoon " +
                    (selected ? "border-lagoon bg-lagoon/5" : "border-slate-300 hover:border-slate-400")
                  }
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={selected}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="block text-sm font-semibold text-harbor">{option.title}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">{option.desc}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <Input
          label="Poora naam"
          name="name"
          autoComplete="name"
          placeholder="Rahul Sharma"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

        {form.role === "employer" && (
          <Input
            label="Company ka naam"
            name="companyName"
            autoComplete="organization"
            placeholder="TechNova"
            value={form.companyName}
            onChange={handleChange}
            error={errors.companyName}
          />
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

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Min 6 characters"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Input
            label="Password dobara"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Same password"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
        </div>

        <Button type="submit" className="w-full">
          Account banao
        </Button>
      </form>
    </AuthShell>
  );
}
