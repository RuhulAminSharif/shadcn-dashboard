"use client";

import { cn } from "@/lib/utils";
import { DataTableFeatures } from "./data-table-features";
import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Payment = {
  id: string;
  amount: number;
  username: string;
  email: string;
  status: "pending" | "processing" | "success" | "failed";
};

const columnHelper = createColumnHelper<DataTableFeatures, Payment>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        checked={table.getIsAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        checked={row.getIsSelected()}
      />
    ),
  }),

  columnHelper.accessor("username", {
    header: "User",
  }),

  columnHelper.accessor("email", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <div
          className={cn(
            `p-1 rounded-md w-max text-xs`,
            status === "pending" && "bg-yellow-500/40",
            status === "success" && "bg-green-500/40",
            status === "failed" && "bg-red-500/40",
          )}
        >
          {status as string}
        </div>
      );
    },
  }),

  columnHelper.accessor("amount", {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  }),

  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" className="h-8 w-8 p-0" />}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);
