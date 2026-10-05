"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrainerItem } from "@/lib/initial-data";

interface TrainerTableProps {
  trainers: TrainerItem[];
  onEdit: (trainer: TrainerItem) => void;
  onDelete: (id: string) => void;
}

export function TrainerTable({ trainers, onEdit, onDelete }: TrainerTableProps) {
  if (trainers.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 bg-zinc-50">
        No trainers found.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Trainer Name</TableHead>
          <TableHead>Specialization</TableHead>
          <TableHead>Experience</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trainers.map((trainer) => (
          <TableRow key={trainer.id}>
            <TableCell className="font-medium text-zinc-900">
              {trainer.name}
            </TableCell>
            <TableCell className="text-zinc-700">
              <span className="font-medium text-xs bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded">
                {trainer.specialization}
              </span>
            </TableCell>
            <TableCell className="text-zinc-600">
              {trainer.experienceYears} {trainer.experienceYears === 1 ? "yr" : "yrs"}
            </TableCell>
            <TableCell className="text-zinc-600">
              <div className="text-xs">
                <div>{trainer.email}</div>
                <div className="text-zinc-400">{trainer.phone}</div>
              </div>
            </TableCell>
            <TableCell>
              {trainer.status === "Active" ? (
                <Badge variant="success">Active</Badge>
              ) : trainer.status === "On Leave" ? (
                <Badge variant="warning">On Leave</Badge>
              ) : (
                <Badge variant="neutral">{trainer.status}</Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(trainer)}
                  className="rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 transition-colors"
                  title="Edit trainer"
                  aria-label={`Edit ${trainer.name}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(trainer.id)}
                  className="rounded p-1 text-zinc-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Delete trainer"
                  aria-label={`Delete ${trainer.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
