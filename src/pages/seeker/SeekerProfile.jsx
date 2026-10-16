import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { EXPERIENCE_LEVELS } from "@/utils/constants";
import { parseSkills } from "@/utils/applicationHelpers";

const URL_REGEX = /^https?:\/\/\S+$/i;

export default function SeekerProfile() {
  const { user, updateUser } = useAuth();
  const profile = user.profile || {};

  const [form, setForm] = useState({
    name: user.name,
    experience: profile.experience || EXPERIENCE_LEVELS[0],
    skills: (profile.skills || []).join(", "),
    resumeLink: profile.resumeLink || "",
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
    if (form.name.trim().length < 2) next.name = "Naam kam se kam 2 letters ka ho.";
    if (form.resumeLink.trim() && !URL_REGEX.test(form.resumeLink.trim())) next.resumeLink = "Sahi link daalo (https:// se shuru).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    updateUser({
      name: form.name,
      profile: { experience: form.experience, skills: parseSkills(form.skills), resumeLink: form.resumeLink.trim() },
    });
    toast.success("Profile save ho gaya.");
  };

  const skillChips = parseSkills(form.skills);

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-harbor">My profile</h1>
      <p className="mt-1 text-slate-600">Apply karte waqt ye details employer ko dikhti hain.</p>

      <Card className="mt-6">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input label="Poora naam" name="name" value={form.name} onChange={handleChange} error={errors.name} />
          <Input label="Email" value={user.email} disabled readOnly />
          <Select label="Experience" name="experience" value={form.experience} onChange={handleChange}>
            {EXPERIENCE_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </Select>

          <div>
            <Input label="Skills (comma se alag karo)" name="skills" placeholder="React, Tailwind, JavaScript" value={form.skills} onChange={handleChange} />
            {skillChips.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Skills preview">
                {skillChips.map((skill) => (
                  <li key={skill} className="rounded-full bg-mist px-2 py-0.5 text-xs text-harbor">
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Input label="Resume link" name="resumeLink" type="url" placeholder="https://drive.google.com/..." value={form.resumeLink} onChange={handleChange} error={errors.resumeLink} />

          <Button type="submit">Save profile</Button>
        </form>
      </Card>
    </div>
  );
}
