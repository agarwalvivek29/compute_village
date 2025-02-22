import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

export type Worker = {
  id: string
  status: "online" | "offline"
  active: number
  processed: number
  failed: number
  succeeded: number
  retried: number
  loadAverage: string
}

export const columns: ColumnDef<Worker>[] = [
  {
    accessorKey: "id",
    header: "Worker",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <Badge variant={status === "online" ? "success" : "secondary"}>{status}</Badge>
    },
  },
  {
    accessorKey: "active",
    header: "Active",
  },
  {
    accessorKey: "processed",
    header: "Processed",
  },
  {
    accessorKey: "failed",
    header: "Failed",
  },
  {
    accessorKey: "succeeded",
    header: "Succeeded",
  },
  {
    accessorKey: "retried",
    header: "Retried",
  },
  {
    accessorKey: "loadAverage",
    header: "Load Average",
  },
]

