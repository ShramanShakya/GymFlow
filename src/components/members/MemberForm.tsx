"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { MemberItem } from "@/lib/initial-data";

interface MemberFormProps {
  initialData?: MemberItem | null;
  onSave: (member: Omit<MemberItem, "id"> | MemberItem) => void;
  onCancel: () => void;
}

export function MemberForm({ initialData, onSave, onCancel }: MemberFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    membershipType: initialData?.membershipType || "Basic",
    startDate: initialData?.startDate || new Date().toISOString().split("T")[0],
    endDate:
      initialData?.endDate ||
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    status: initialData?.status || "Active",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (initialData?.id) {
      onSave({ ...formData, id: initialData.id } as MemberItem);
    } else {
      onSave(formData as Omit<MemberItem, "id">);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <Label required>Name</Label>
        <Input
          placeholder="e.g. John Doe"
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
            placeholder="john@example.com"
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
            placeholder="081-234-5678"
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
          <Label>Membership Type</Label>
          <Select
            value={formData.membershipType}
            onChange={(e) =>
              setFormData({
                ...formData,
                membershipType: e.target.value as "Basic" | "Premium" | "VIP",
              })
            }
          >
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="VIP">VIP</option>
          </Select>
        </div>

        <div>
          <Label>Status</Label>
          <Select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as "Active" | "Expired" | "Pending",
              })
            }
          >
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Expired">Expired</option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label required>Start Date</Label>
          <Input
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
          />
          {errors.startDate && (
            <span className="text-xs text-red-500">{errors.startDate}</span>
          )}
        </div>

        <div>
          <Label required>End Date</Label>
          <Input
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
          />
          {errors.endDate && (
            <span className="text-xs text-red-500">{errors.endDate}</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Save Changes" : "Save Member"}
        </Button>
      </div>
    </form>
  );
}
