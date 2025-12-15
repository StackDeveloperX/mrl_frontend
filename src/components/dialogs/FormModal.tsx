// src/components/dialogs/FormModal.tsx
"use client";

import { useEffect, useState } from "react";

export type FormField = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "select";
  options?: { label: string; value: string }[]; // for select
};

type FormValues = Record<string, string>;

type FormModalProps = {
  open: boolean;
  title: string;
  fields: FormField[];
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  submitLabel?: string;
  cancelLabel?: string;
  errorText?: string | null;
};

export function FormModal({
  open,
  title,
  fields,
  onClose,
  onSubmit,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  errorText,
}: FormModalProps) {
  const [values, setValues] = useState<FormValues>({});

  useEffect(() => {
    if (open) {
      const initial: FormValues = {};
      fields.forEach((f) => {
        // default select to first option if available
        if (f.type === "select" && f.options?.length) {
          initial[f.name] = f.options[0].value;
        } else {
          initial[f.name] = "";
        }
      });
      setValues(initial);
    }
  }, [open, fields]);

  if (!open) return null;

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl overflow-hidden rounded-[24px] bg-white shadow-xl">
        <div className="bg-[#DFFAF7] px-8 py-4">
          <h2 className="text-lg font-semibold text-[#1A2B4C]">{title}</h2>
        </div>

        {/* Scrollable content area */}
        <form onSubmit={handleSubmit} className="px-8 py-6 max-h-[80vh] overflow-y-auto">
          {errorText ? (
            <div className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
              {errorText}
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <div key={field.name} className="space-y-1.5 text-sm">
                <label className="block text-xs font-medium text-[#1A2B4C]">
                  {field.label}
                </label>

                {field.type === "select" ? (
                  <select
                    value={values[field.name] ?? ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="h-10 w-full rounded-[16px] border border-[#E5E7EB] bg-white px-3 text-sm outline-none"
                  >
                    {(field.options ?? []).map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type ?? "text"}
                    value={values[field.name] ?? ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="h-10 w-full rounded-[16px] border border-[#E5E7EB] bg-white px-3 text-sm outline-none placeholder:text-[#9CA3AF]"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="h-10 min-w-[120px] rounded-[8px] border border-[#E5E7EB] bg-white px-6 text-sm font-medium text-[#1A2B4C] hover:bg-[#F3F4F6]"
            >
              {cancelLabel}
            </button>

            <button
              type="submit"
              className="h-10 min-w-[120px] rounded-[8px] bg-[#1A2B4C] px-6 text-sm font-semibold text-white hover:bg-[#0f1c33]"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
