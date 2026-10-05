"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { ClassTable } from "@/components/classes/ClassTable";
import { ClassForm } from "@/components/classes/ClassForm";
import { ClassItem, TrainerItem } from "@/lib/initial-data";

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [trainers, setTrainers] = useState<TrainerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [classesRes, trainersRes] = await Promise.all([
        fetch("/api/classes"),
        fetch("/api/trainers"),
      ]);
      const [classesData, trainersData] = await Promise.all([
        classesRes.json(),
        trainersRes.json(),
      ]);
      setClasses(classesData);
      setTrainers(trainersData);
    } catch (err) {
      console.error("Failed to load classes or trainers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.trainerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.room.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || cls.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setEditingClass(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cls: ClassItem) => {
    setEditingClass(cls);
    setIsModalOpen(true);
  };

  const handleSaveClass = async (
    classData: Omit<ClassItem, "id"> | ClassItem
  ) => {
    try {
      if ("id" in classData && classData.id) {
        const res = await fetch("/api/classes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(classData),
        });
        const updated = await res.json();
        setClasses((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
      } else {
        const res = await fetch("/api/classes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(classData),
        });
        const created = await res.json();
        setClasses((prev) => [created, ...prev]);
      }
    } catch (err) {
      console.error("Failed to save class:", err);
    } finally {
      setIsModalOpen(false);
      setEditingClass(null);
    }
  };

  const handleDeleteClass = async (id: string) => {
    if (window.confirm("Are you sure you want to cancel and remove this class?")) {
      try {
        await fetch(`/api/classes?id=${id}`, { method: "DELETE" });
        setClasses((prev) => prev.filter((c) => c.id !== id));
      } catch (err) {
        console.error("Failed to delete class:", err);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Class Schedule
          </h2>
          <p className="text-sm text-zinc-500">
            Organize group sessions, yoga, boxing, and training slots in MongoDB.
          </p>
        </div>

        <Button onClick={handleOpenAddModal} className="shrink-0">
          <Plus className="h-4 w-4 mr-1.5" />
          Schedule Class
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search by class name, trainer, room..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-36">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Class Schedule Table */}
      {loading ? (
        <div className="flex items-center justify-center p-12 text-sm text-zinc-500">
          <Loader2 className="h-5 w-5 animate-spin mr-2 text-emerald-600" />
          Loading class schedule from database...
        </div>
      ) : (
        <ClassTable
          classes={filteredClasses}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteClass}
        />
      )}

      {/* Add / Edit Class Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingClass ? "Edit Class Schedule" : "Schedule New Class"}
        description={
          editingClass
            ? "Update class timing, trainer, or capacity."
            : "Select a trainer and configure room and time slot."
        }
      >
        <ClassForm
          initialData={editingClass}
          trainers={trainers}
          onSave={handleSaveClass}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
