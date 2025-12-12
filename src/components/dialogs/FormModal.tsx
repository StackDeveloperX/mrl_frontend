"use client";

import { useEffect, useState } from "react";

export type FormField = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel";
};

type FormValues = Record<string, string>;

type FormModalProps = {
  open: boolean;
  title: string;
  fields: FormField[];
  onClose: () => void;
  onSubmit: (values: FormValues) => void | Promise<void>;
  submitLabel?: string;
  cancelLabel?: string;
  errorText?: string | null;
  initialValues?: FormValues; // ✅ for Edit mode
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
  initialValues,
}: FormModalProps) {
  const [values, setValues] = useState<FormValues>({});

  useEffect(() => {
    if (!open) return;

    const initial: FormValues = {};
    fields.forEach((f) => {
      initial[f.name] = initialValues?.[f.name] ?? "";
    });
    setValues(initial);
  }, [open, fields, initialValues]);

  if (!open) return null;

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl overflow-hidden rounded-[24px] bg-white shadow-xl">
        {/* Header */}
        <div className="bg-[#DFFAF7] px-8 py-4">
          <h2 className="text-lg font-semibold text-[#1A2B4C]">{title}</h2>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-8 py-6">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <div key={field.name} className="space-y-1.5 text-sm">
                <label className="block text-xs font-medium text-[#1A2B4C]">
                  {field.label}
                </label>
                <input
                  type={field.type ?? "text"}
                  value={values[field.name] ?? ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="h-10 w-full rounded-[16px] border border-[#E5E7EB] bg-white px-3 text-sm outline-none placeholder:text-[#9CA3AF]"
                />
              </div>
            ))}
          </div>

          {/* Error */}
          {errorText ? (
            <div className="mt-4 text-center text-sm font-medium text-red-500">
              {errorText}
            </div>
          ) : null}

          {/* Actions */}
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
