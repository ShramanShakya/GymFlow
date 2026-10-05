"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ClassItem } from "@/lib/initial-data";

interface ClassTableProps {
  classes: ClassItem[];
  onEdit: (cls: ClassItem) => void;
  onDelete: (id: string) => void;
}

export function ClassTable({ classes, onEdit, onDelete }: ClassTableProps) {
  if (classes.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 bg-zinc-50">
        No scheduled classes found.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Class Name</TableHead>
          <TableHead>Trainer</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Room</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classes.map((cls) => (
          <TableRow key={cls.id}>
            <TableCell className="font-medium text-zinc-900">
              {cls.title}
            </TableCell>
            <TableCell className="text-zinc-700">{cls.trainerName}</TableCell>
            <TableCell className="text-zinc-600">
              <div className="text-xs">
                <span className="font-medium text-zinc-800">{cls.date}</span>
                <span className="text-zinc-500 block">{cls.time}</span>
              </div>
            </TableCell>
            <TableCell className="text-zinc-600 text-xs">
              <span className="bg-zinc-100 px-2 py-0.5 rounded text-zinc-700">
                {cls.room}
              </span>
            </TableCell>
            <TableCell className="text-zinc-600 text-xs">
              <span className="font-medium text-zinc-800">{cls.enrolled}</span>
              <span className="text-zinc-400"> / {cls.capacity}</span>
            </TableCell>
            <TableCell>
              {cls.status === "Upcoming" ? (
                <Badge variant="success">Upcoming</Badge>
              ) : cls.status === "In Progress" ? (
                <Badge variant="warning">In Progress</Badge>
              ) : cls.status === "Completed" ? (
                <Badge variant="neutral">Completed</Badge>
              ) : (
                <Badge variant="danger">Cancelled</Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(cls)}
                  className="rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 transition-colors"
                  title="Edit class"
                  aria-label={`Edit ${cls.title}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(cls.id)}
                  className="rounded p-1 text-zinc-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Delete class"
                  aria-label={`Delete ${cls.title}`}
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
