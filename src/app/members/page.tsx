"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { MemberTable } from "@/components/members/MemberTable";
import { MemberForm } from "@/components/members/MemberForm";
import { MemberItem } from "@/lib/initial-data";

export default function MembersPage() {
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberItem | null>(null);

  // Fetch members from MongoDB on load
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/members");
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error("Failed to load members:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Filter members based on search and status
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery);

    const matchesStatus =
      statusFilter === "ALL" || member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member: MemberItem) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleSaveMember = async (
    memberData: Omit<MemberItem, "id"> | MemberItem
  ) => {
    try {
      if ("id" in memberData && memberData.id) {
        // Update member in MongoDB
        const res = await fetch("/api/members", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(memberData),
        });
        const updated = await res.json();
        setMembers((prev) =>
          prev.map((m) => (m.id === updated.id ? updated : m))
        );
      } else {
        // Create new member in MongoDB
        const res = await fetch("/api/members", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(memberData),
        });
        const created = await res.json();
        setMembers((prev) => [created, ...prev]);
      }
    } catch (err) {
      console.error("Failed to save member:", err);
    } finally {
      setIsModalOpen(false);
      setEditingMember(null);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await fetch(`/api/members?id=${id}`, { method: "DELETE" });
        setMembers((prev) => prev.filter((m) => m.id !== id));
      } catch (err) {
        console.error("Failed to delete member:", err);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Members
          </h2>
          <p className="text-sm text-zinc-500">
            View, search, and manage gym memberships connected live to MongoDB.
          </p>
        </div>

        <Button onClick={handleOpenAddModal} className="shrink-0">
          <Plus className="h-4 w-4 mr-1.5" />
          Add Member
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search members by name, email..."
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
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Member Table */}
      {loading ? (
        <div className="flex items-center justify-center p-12 text-sm text-zinc-500">
          <Loader2 className="h-5 w-5 animate-spin mr-2 text-emerald-600" />
          Loading members from database...
        </div>
      ) : (
        <MemberTable
          members={filteredMembers}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteMember}
        />
      )}

      {/* Add / Edit Member Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMember ? "Edit Member" : "Add New Member"}
        description={
          editingMember
            ? "Update membership details and status."
            : "Enter member information to create a new registration."
        }
      >
        <MemberForm
          initialData={editingMember}
          onSave={handleSaveMember}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
