import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/types/models/transaction";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { TransactionDialog, TransactionDrawer } from "./TransactionDrawer";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/useTransactions";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { columns } from "./table/column";
import { useMediaQuery } from "@uidotdev/usehooks";

export const TableTransactions = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 10;
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Transaction | null>(null);

    const {
        data,
        isLoading: isLoadingTransactions,
        isError,
    } = useTransactions({
        page: pageIndex + 1,
        perPage: pageSize,
    });

    const table = useReactTable({
        data: data?.data ?? [],
        columns,
        pageCount: data?.last_page ?? -1,
        state: {
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        manualPagination: true,
        onPaginationChange: (updater) => {
            if (typeof updater === "function") {
                const next = updater({ pageIndex, pageSize });
                setPageIndex(next.pageIndex);
            } else {
                setPageIndex(updater.pageIndex);
            }
        },
        getCoreRowModel: getCoreRowModel(),
    });

    const selectRowHandler = (idTransaction: number) => {
        const selected: Transaction | undefined = data!.data.find(
            (transaction) => transaction.id == idTransaction,
        );
        setSelectedRow(selected ? selected : null);
        setOpen(true);
    };

    return (
        <div>
            {/*Header*/}
            <div className="text-xl font-medium mb-3">Tabel Transaksi</div>
            {/*Content*/}
            <div className="col-span-3">
                {/*Table Component*/}
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup, index) => (
                            <TableRow key={index}>
                                {headerGroup.headers.map((header, id) => (
                                    <TableHead key={id}>
                                        <div className="hidden md:block">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoadingTransactions ? (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : isError ? (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    Gagal memuat data.
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    Tidak ada data.
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows.map((row, id) => (
                                <TableRow
                                    key={id}
                                    onClick={() =>
                                        selectRowHandler(row.original.id)
                                    }
                                >
                                    {row.getVisibleCells().map((cell, idx) => (
                                        <TableCell key={idx}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {/*Pagination Button Component*/}
                <div className="flex justify-end gap-4 items-center py-4">
                    <Button
                        size={"sm"}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ArrowLeft />
                    </Button>
                    <span></span>
                    <Button
                        size={"sm"}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ArrowRight />
                    </Button>
                </div>
            </div>

            {/*Pop up Component*/}
            {open && isDesktop ? (
                <TransactionDialog
                    open={open}
                    onOpenChange={setOpen}
                    data={selectedRow}
                />
            ) : (
                <TransactionDrawer
                    open={open}
                    onOpenChange={setOpen}
                    data={selectedRow}
                />
            )}
        </div>
    );
};
