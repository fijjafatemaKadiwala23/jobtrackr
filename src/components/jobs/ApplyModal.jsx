import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

const URL_REGEX = /^https?:\/\/\S+$/i;

// Form alag component me hai, isliye modal har baar khulne par fresh state se shuru hota hai
function ApplyForm({ user, onSubmit, onCancel }) {
  const [resumeLink, setResumeLink] = useState(user?.profile?.resumeLink || "");
  const [coverNote, setCoverNote] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resumeLink.trim() && !URL_REGEX.test(resumeLink.trim())) {
      setError("Sahi link daalo (https:// se shuru).");
      return;
    }
    onSubmit({ coverNote: coverNote.trim(), resumeLink: resumeLink.trim() });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <p className="rounded-md bg-mist px-3 py-2 text-sm text-slate-600">
        Aap <span className="font-medium text-harbor">{user?.name}</span> (
        {user?.email}) ke naam se apply kar rahe ho.
      </p>

      <Input
        label="Resume link"
        type="url"
        placeholder="https://drive.google.com/..."
        value={resumeLink}
        onChange={(e) => {
          setResumeLink(e.target.value);
          setError("");
        }}
        error={error}
      />
      <Textarea
        label="Cover note (optional)"
        rows={5}
        placeholder="Aap is role ke liye kyun sahi ho?"
        value={coverNote}
        onChange={(e) => setCoverNote(e.target.value)}
      />

      <div className="flex flex-wrap gap-3">
        <Button type="submit">Apply now</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default function ApplyModal({ open, onClose, job, user, onSubmit }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={job ? "Apply: " + job.title : "Apply"}
    >
      <ApplyForm user={user} onSubmit={onSubmit} onCancel={onClose} />
    </Modal>
  );
}
