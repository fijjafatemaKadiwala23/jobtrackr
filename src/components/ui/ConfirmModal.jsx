import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Confirm delete",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  loading = false,
}) {
  return (
    <Modal open={open} onClose={loading ? () => {} : onClose} title={title}>
      <p className="text-sm leading-6 text-slate-600">{message}</p>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={onConfirm}
          loading={loading}
          disabled={loading}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}
