import { Badge } from "@/components/ui/badge";

interface MemberStatusBadgeProps {
  status: "Active" | "Expired" | "Pending";
}

export function MemberStatusBadge({ status }: MemberStatusBadgeProps) {
  switch (status) {
    case "Active":
      return <Badge variant="success">Active</Badge>;
    case "Expired":
      return <Badge variant="danger">Expired</Badge>;
    case "Pending":
      return <Badge variant="warning">Pending</Badge>;
    default:
      return <Badge variant="neutral">{status}</Badge>;
  }
}
