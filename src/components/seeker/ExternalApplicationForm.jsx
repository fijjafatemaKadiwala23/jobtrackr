import { useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { SEEKER_LABELS } from "@/utils/constants";

const URL_REGEX = /^https?:\/\/\S+$/i;
const STATUS_OPTIONS = ["saved", "applied", "interview"];

// Kisi aur site par apply kiya ho to yahan se manually add karo
export default function ExternalApplicationForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({ title: "", company: "", link: "", status: "applied" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.title.trim()) next.title = "Job title daalo.";
    if (!form.company.trim()) next.company = "Company ka naam daalo.";
    if (form.link.trim() && !URL_REGEX.test(form.link.trim())) next.link = "Sahi link daalo (https:// se shuru).";
    setErrors(next);
    if (Object.keys(next).length === 0) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Input label="Job title *" name="title" placeholder="Frontend Engineer" value={form.title} onChange={handleChange} error={errors.title} />
      <Input label="Company *" name="company" placeholder="Zoho" value={form.company} onChange={handleChange} error={errors.company} />
      <Input label="Job link" name="link" type="url" placeholder="https://..." value={form.link} onChange={handleChange} error={errors.link} />
      <Select label="Abhi status kya hai?" name="status" value={form.status} onChange={handleChange}>
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {SEEKER_LABELS[status]}
          </option>
        ))}
      </Select>

      <div className="flex flex-wrap gap-3">
        <Button type="submit">Add application</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
