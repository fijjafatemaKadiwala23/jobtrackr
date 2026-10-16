import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import useJobs from "@/hooks/useJobs";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

const URL_REGEX = /^https?:\/\/\S+$/i;

export default function Company() {
  const { user, updateUser } = useAuth();
  const { jobs, editJob } = useJobs();
  const profile = user.profile || {};

  const [form, setForm] = useState({
    companyName: profile.companyName || "",
    website: profile.website || "",
    location: profile.location || "",
    about: profile.about || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.companyName.trim()) next.companyName = "Company ka naam daalo.";
    if (form.website.trim() && !URL_REGEX.test(form.website.trim())) next.website = "Sahi link daalo (https:// se shuru).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const companyName = form.companyName.trim();
    updateUser({
      profile: { companyName, website: form.website.trim(), location: form.location.trim(), about: form.about.trim() },
    });
    // Purani jobs par bhi naya company naam dikhe
    jobs.filter((j) => j.employerId === user.id && j.company !== companyName).forEach((j) => editJob(j.id, { company: companyName }));
    toast.success("Company profile save ho gaya.");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-harbor">Company profile</h1>
      <p className="mt-1 text-slate-600">Ye details aapki job posts par dikhti hain.</p>

      <Card className="mt-6">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input label="Company ka naam *" name="companyName" value={form.companyName} onChange={handleChange} error={errors.companyName} />
          <Input label="Website" name="website" type="url" placeholder="https://company.com" value={form.website} onChange={handleChange} error={errors.website} />
          <Input label="Location" name="location" placeholder="Ahmedabad" value={form.location} onChange={handleChange} />
          <Textarea label="Company ke baare me" name="about" rows={5} value={form.about} onChange={handleChange} />
          <Button type="submit">Save profile</Button>
        </form>
      </Card>
    </div>
  );
}
