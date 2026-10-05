"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { ClassItem, TrainerItem } from "@/lib/initial-data";

interface ClassFormProps {
  initialData?: ClassItem | null;
  trainers: TrainerItem[];
  onSave: (cls: Omit<ClassItem, "id"> | ClassItem) => void;
  onCancel: () => void;
}

export function ClassForm({
  initialData,
  trainers,
  onSave,
  onCancel,
}: ClassFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    trainerName: initialData?.trainerName || (trainers[0]?.name ?? "Sarah Connor"),
    date: initialData?.date || "Sep 15, 2026",
    time: initialData?.time || "10:00 - 11:00",
    room: initialData?.room || "Studio A",
    capacity: initialData?.capacity ?? 20,
    enrolled: initialData?.enrolled ?? 0,
    status: initialData?.status || "Upcoming",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title.trim()) newErrors.title = "Class title is required";
    if (!formData.trainerName.trim()) newErrors.trainerName = "Trainer is required";
    if (!formData.date.trim()) newErrors.date = "Date is required";
    if (!formData.time.trim()) newErrors.time = "Time is required";
    if (formData.capacity < 1) newErrors.capacity = "Capacity must be at least 1";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (initialData?.id) {
      onSave({ ...formData, id: initialData.id } as ClassItem);
    } else {
      onSave(formData as Omit<ClassItem, "id">);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <Label required>Class Title</Label>
        <Input
          placeholder="e.g. Morning Yoga"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        {errors.title && (
          <span className="text-xs text-red-500">{errors.title}</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label required>Trainer</Label>
          <Select
            value={formData.trainerName}
            onChange={(e) =>
              setFormData({ ...formData, trainerName: e.target.value })
            }
          >
            {trainers.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name} ({t.specialization})
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label required>Room / Location</Label>
          <Input
            placeholder="e.g. Studio A, Boxing Ring"
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label required>Date</Label>
          <Input
            placeholder="e.g. Sep 15, 2026"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          {errors.date && (
            <span className="text-xs text-red-500">{errors.date}</span>
          )}
        </div>

        <div>
          <Label required>Time</Label>
          <Input
            placeholder="e.g. 09:00 - 10:00"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
          {errors.time && (
            <span className="text-xs text-red-500">{errors.time}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <Label required>Capacity</Label>
          <Input
            type="number"
            min={1}
            value={formData.capacity}
            onChange={(e) =>
              setFormData({
                ...formData,
                capacity: parseInt(e.target.value) || 1,
              })
            }
          />
          {errors.capacity && (
            <span className="text-xs text-red-500">{errors.capacity}</span>
          )}
        </div>

        <div>
          <Label>Enrolled</Label>
          <Input
            type="number"
            min={0}
            value={formData.enrolled}
            onChange={(e) =>
              setFormData({
                ...formData,
                enrolled: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>

        <div>
          <Label>Status</Label>
          <Select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as
                  | "Upcoming"
                  | "In Progress"
                  | "Completed"
                  | "Cancelled",
              })
            }
          >
            <option value="Upcoming">Upcoming</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-100">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Save Changes" : "Schedule Class"}
        </Button>
      </div>
    </form>
  );
}
