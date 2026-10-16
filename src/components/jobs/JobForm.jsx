import { useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { JOB_TYPES } from "@/utils/constants";
import { parseSkills } from "@/utils/applicationHelpers";

// Salary form me LPA (lakh per annum) me bharte hain, save rupees me hota hai
const toLpa = (rupees) => (rupees ? String(+(rupees / 100000).toFixed(2)) : "");

function buildInitial(job) {
  return {
    title: job?.title || "",
    location: job?.location || "",
    type: job?.type || JOB_TYPES[0],
    salaryMin: toLpa(job?.salaryMin),
    salaryMax: toLpa(job?.salaryMax),
    skills: job ? job.skills.join(", ") : "",
    deadline: job?.deadline || "",
    description: job?.description || "",
  };
}

export default function JobForm({
  initial = null,
  onSubmit,
  onCancel,
  submitLabel = "Post job",
}) {
  const [form, setForm] = useState(() => buildInitial(initial));
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    const min = Number(form.salaryMin);
    const max = Number(form.salaryMax);

    if (form.title.trim().length < 3)
      next.title = "Job title kam se kam 3 letters ka ho.";
    if (!form.location.trim()) next.location = "Location daalo.";
    if (!(min > 0)) next.salaryMin = "Minimum salary daalo (LPA me).";
    if (!(max > 0)) next.salaryMax = "Maximum salary daalo (LPA me).";
    else if (max < min)
      next.salaryMax = "Maximum, minimum se kam nahi ho sakta.";
    if (parseSkills(form.skills).length === 0)
      next.skills = "Kam se kam 1 skill daalo.";
    if (form.description.trim().length < 30)
      next.description = "Description kam se kam 30 characters ka ho.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: form.title.trim(),
      location: form.location.trim(),
      type: form.type,
      salaryMin: Math.round(Number(form.salaryMin) * 100000),
      salaryMax: Math.round(Number(form.salaryMax) * 100000),
      skills: parseSkills(form.skills),
      deadline: form.deadline,
      description: form.description.trim(),
    });
  };

  const skillChips = parseSkills(form.skills);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Job title *"
          name="title"
          placeholder="React Developer"
          value={form.title}
          onChange={handleChange}
          error={errors.title}
        />
        <Input
          label="Location *"
          name="location"
          placeholder="Ahmedabad / Remote"
          value={form.location}
          onChange={handleChange}
          error={errors.location}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Select
          label="Job type"
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          {JOB_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
        <Input
          label="Min salary (LPA) *"
          name="salaryMin"
          type="number"
          min="0"
          step="0.1"
          placeholder="4"
          value={form.salaryMin}
          onChange={handleChange}
          error={errors.salaryMin}
        />
        <Input
          label="Max salary (LPA) *"
          name="salaryMax"
          type="number"
          min="0"
          step="0.1"
          placeholder="8"
          value={form.salaryMax}
          onChange={handleChange}
          error={errors.salaryMax}
        />
      </div>

      <div>
        <Input
          label="Skills * (comma se alag karo)"
          name="skills"
          placeholder="React, Tailwind, JavaScript"
          value={form.skills}
          onChange={handleChange}
          error={errors.skills}
        />
        {skillChips.length > 0 && (
          <ul
            className="mt-2 flex flex-wrap gap-1.5"
            aria-label="Skills preview"
          >
            {skillChips.map((skill) => (
              <li
                key={skill}
                className="rounded-full bg-mist px-2 py-0.5 text-xs text-harbor"
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Input
        label="Last date to apply"
        name="deadline"
        type="date"
        value={form.deadline}
        onChange={handleChange}
      />

      <Textarea
        label="Description *"
        name="description"
        rows={7}
        placeholder="Role ke baare me likho. Requirements alag lines me likh sakte ho."
        value={form.description}
        onChange={handleChange}
        error={errors.description}
      />

      <div className="flex flex-wrap gap-3">
        <Button type="submit">{submitLabel}</Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
