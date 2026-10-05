"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { TrainerTable } from "@/components/trainers/TrainerTable";
import { TrainerForm } from "@/components/trainers/TrainerForm";
import { TrainerItem } from "@/lib/initial-data";

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<TrainerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<TrainerItem | null>(null);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/trainers");
      const data = await res.json();
      setTrainers(data);
    } catch (err) {
      console.error("Failed to load trainers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || trainer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setEditingTrainer(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (trainer: TrainerItem) => {
    setEditingTrainer(trainer);
    setIsModalOpen(true);
  };

  const handleSaveTrainer = async (
    trainerData: Omit<TrainerItem, "id"> | TrainerItem
  ) => {
    try {
      if ("id" in trainerData && trainerData.id) {
        const res = await fetch("/api/trainers", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trainerData),
        });
        const updated = await res.json();
        setTrainers((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t))
        );
      } else {
        const res = await fetch("/api/trainers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trainerData),
        });
        const created = await res.json();
        setTrainers((prev) => [created, ...prev]);
      }
    } catch (err) {
      console.error("Failed to save trainer:", err);
    } finally {
      setIsModalOpen(false);
      setEditingTrainer(null);
    }
  };

  const handleDeleteTrainer = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      try {
        await fetch(`/api/trainers?id=${id}`, { method: "DELETE" });
        setTrainers((prev) => prev.filter((t) => t.id !== id));
      } catch (err) {
        console.error("Failed to delete trainer:", err);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Trainers
          </h2>
          <p className="text-sm text-zinc-500">
            Certified coaches, instructors, and personal trainers in MongoDB.
          </p>
        </div>

        <Button onClick={handleOpenAddModal} className="shrink-0">
          <Plus className="h-4 w-4 mr-1.5" />
          Add Trainer
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search by name or specialization..."
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
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Trainer Table */}
      {loading ? (
        <div className="flex items-center justify-center p-12 text-sm text-zinc-500">
          <Loader2 className="h-5 w-5 animate-spin mr-2 text-emerald-600" />
          Loading trainers from database...
        </div>
      ) : (
        <TrainerTable
          trainers={filteredTrainers}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteTrainer}
        />
      )}

      {/* Add / Edit Trainer Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTrainer ? "Edit Trainer" : "Add New Trainer"}
        description={
          editingTrainer
            ? "Update trainer qualifications and contact information."
            : "Enter coach information to add them to the staff directory."
        }
      >
        <TrainerForm
          initialData={editingTrainer}
          onSave={handleSaveTrainer}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
