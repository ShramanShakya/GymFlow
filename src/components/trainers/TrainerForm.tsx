"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { TrainerItem } from "@/lib/initial-data";

interface TrainerFormProps {
  initialData?: TrainerItem | null;
  onSave: (trainer: Omit<TrainerItem, "id"> | TrainerItem) => void;
  onCancel: () => void;
}

export function TrainerForm({ initialData, onSave, onCancel }: TrainerFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    specialization: initialData?.specialization || "",
    experienceYears: initialData?.experienceYears ?? 3,
    status: initialData?.status || "Active",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Trainer name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.specialization.trim())
      newErrors.specialization = "Specialization is required";
    if (formData.experienceYears < 0)
      newErrors.experienceYears = "Experience must be 0 or greater";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (initialData?.id) {
      onSave({ ...formData, id: initialData.id } as TrainerItem);
    } else {
      onSave(formData as Omit<TrainerItem, "id">);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <Label required>Full Name</Label>
        <Input
          placeholder="e.g. Sarah Connor"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name}</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label required>Email</Label>
          <Input
            type="email"
            placeholder="sarah@gymflow.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email}</span>
          )}
        </div>

        <div>
          <Label required>Phone</Label>
          <Input
            type="tel"
            placeholder="089-111-2233"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          {errors.phone && (
            <span className="text-xs text-red-500">{errors.phone}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label required>Specialization</Label>
          <Input
            placeholder="e.g. Yoga & Pilates"
            value={formData.specialization}
            onChange={(e) =>
              setFormData({ ...formData, specialization: e.target.value })
            }
          />
          {errors.specialization && (
            <span className="text-xs text-red-500">{errors.specialization}</span>
          )}
        </div>

        <div>
          <Label required>Experience (Years)</Label>
          <Input
            type="number"
            min={0}
            value={formData.experienceYears}
            onChange={(e) =>
              setFormData({
                ...formData,
                experienceYears: parseInt(e.target.value) || 0,
              })
            }
          />
          {errors.experienceYears && (
            <span className="text-xs text-red-500">{errors.experienceYears}</span>
          )}
        </div>
      </div>

      <div>
        <Label>Status</Label>
        <Select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as "Active" | "On Leave" | "Inactive",
            })
          }
        >
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
          <option value="Inactive">Inactive</option>
        </Select>
      </div>

      <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Save Changes" : "Add Trainer"}
        </Button>
      </div>
    </form>
  );
}
