"use client"
import { DataTable } from "@/components/data-table"
import { columns } from "@/components/columns"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// This would typically come from your API
const data = [
  {
    id: "celery@deployment-1",
    status: "online",
    active: 0,
    processed: 15051,
    failed: 32,
    succeeded: 14945,
    retried: 71,
    loadAverage: "0.59, 0.85, 0.83",
  },
  {
    id: "celery@deployment-2",
    status: "online",
    active: 0,
    processed: 15031,
    failed: 42,
    succeeded: 14908,
    retried: 79,
    loadAverage: "0.1, 0.27, 0.41",
  },
  // Add more worker data as needed
]

export default function WorkerPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Workers</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Show</span>
            <Select defaultValue="15">
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="15" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm font-medium">workers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Search:</span>
            <Input className="w-[200px]" placeholder="Search workers..." />
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
      
    </div>
  )
}

