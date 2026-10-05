"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MemberStatusBadge } from "./MemberStatusBadge";
import { MemberItem } from "@/lib/initial-data";

interface MemberTableProps {
  members: MemberItem[];
  onEdit: (member: MemberItem) => void;
  onDelete: (id: string) => void;
}

export function MemberTable({ members, onEdit, onDelete }: MemberTableProps) {
  if (members.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 bg-zinc-50">
        No members found matching the criteria.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Membership</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-medium text-zinc-900">
              {member.name}
            </TableCell>
            <TableCell className="text-zinc-600">{member.email}</TableCell>
            <TableCell className="text-zinc-600">{member.phone}</TableCell>
            <TableCell>
              <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 text-zinc-700">
                {member.membershipType}
              </span>
            </TableCell>
            <TableCell>
              <MemberStatusBadge status={member.status} />
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(member)}
                  className="rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 transition-colors"
                  title="Edit member"
                  aria-label={`Edit ${member.name}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(member.id)}
                  className="rounded p-1 text-zinc-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Delete member"
                  aria-label={`Delete ${member.name}`}
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
