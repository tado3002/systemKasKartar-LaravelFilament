import { toDatetime } from "@/lib/dateTimeFormatter";
import { toRupiah } from "@/lib/rupiahFormatter";
import { Transaction } from "@/types/models/transaction";
import { ColumnDef } from "@tanstack/react-table";
import { Paperclip } from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
    {
        header: "Nominal",
        accessorKey: "amount",
        cell: ({ row }) => {
            const { user, amount, category } = row.original;
            return (
                <div className="flex flex-col items-center">
                    <span className="flex w-full text-foreground text-sm font-bold">
                        {user.name.slice(0, 20)}
                    </span>
                    <div
                        className={`flex items-center font-bold w-full ${category.is_expense ? "text-green-600" : "text-red-600"}`}
                    >
                        {toRupiah(amount)}
                    </div>
                </div>
            );
        },
    },
    {
        header: "Jenis",
        accessorKey: "category.name",
        cell: ({ row }) => {
            return (
                <div className="hidden md:block">
                    <p className="text-sm items-start h-full hidden md:flex">
                        {row.original.category.name}
                    </p>
                    <span className="text-xs text-foreground/60">
                        {row.original.category.description.slice(0, 50)}
                    </span>
                </div>
            );
        },
    },
    {
        header: "Tanggal",
        accessorKey: "updated_at",
        cell: ({ row }) => {
            return (
                <div>
                    <p className="text-sm items-start text-primary font-bold">
                        {row.original.category.name.slice(0, 15)}
                    </p>
                    <span className="text-xs text-foreground/60">
                        {toDatetime(row.original.created_at)}
                    </span>
                </div>
            );
        },
    },
    {
        header: "Lampiran",
        accessorKey: "attachment",
        cell: ({ row }) => {
            return (
                <div className="hidden md:flex">
                    {row.original.attachment ? <Paperclip /> : "-"}
                </div>
            );
        },
    },
];
