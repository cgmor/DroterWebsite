"use client";

import { Button } from "@/components/site/Button";
import s from "../dentists.module.css";

/** A submit button that asks first. Deleting a file can't be undone. */
export default function ConfirmSubmit({ title, disabled }: { title: string; disabled?: boolean }) {
  return (
    <Button
      type="submit"
      name="intent"
      value="delete"
      variant="secondary"
      size="sm"
      className={s.dangerButton}
      disabled={disabled}
      onClick={(e) => {
        if (!window.confirm(`Delete “${title}”? Dentists lose access to it right away, and it can't be undone.`)) e.preventDefault();
      }}
    >
      Delete<span className="sr-only">: {title}</span>
    </Button>
  );
}
