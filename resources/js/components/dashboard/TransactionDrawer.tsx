import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Transaction } from "@/types/models/transaction";
import { FilePreview } from "./FilePreview";
import { toRupiah } from "@/lib/rupiahFormatter";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

interface TransactionDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: Transaction | null;
}

interface FilePreviewProps {
    name: string;
    url: string;
    type: string;
    size: string;
}

export const TransactionDrawer = ({
    open,
    onOpenChange,
    data,
}: TransactionDrawerProps) => {
    if (!data) return null;

    const filePreview: FilePreviewProps = {
        //http://localhost:8000/storage/transaksi-lampiran/OIP.jpeg

        type: data.attachment_mime_type!,
        name: data.attachment!,
        size:
            data.attachment_size > 10 ** 6
                ? `${Math.ceil(data.attachment_size / 10 ** 6)} Mb`
                : `${Math.ceil(data.attachment_size / 10 ** 3)} Kb`,
        url: `http://localhost:8000/storage/${data.attachment}`,
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Detail Transaksi</DrawerTitle>
                    <DrawerDescription>
                        <div className="space-y-8 pt-8 pb-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-foreground">
                                        ID Transaksi
                                    </p>
                                    <p>{data.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground">
                                        Tanggal
                                    </p>
                                    <p>
                                        {new Date(
                                            data.updated_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground">
                                        Nama
                                    </p>
                                    <p>{data.user.name}</p>
                                </div>
                                <div>
                                    <p className={`text-sm text-foreground`}>
                                        Type
                                    </p>
                                    <p
                                        className={`text-sm text-${data.category.is_expense ? "red-500" : "yellow-500"}`}
                                    >
                                        {data.category.is_expense
                                            ? "Pengeluaran"
                                            : "Pemasukan"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground">
                                        Kategori
                                    </p>
                                    <p>{data.category.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground">
                                        Deskripsi
                                    </p>
                                    <p>{data.category.description}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground">
                                        Catatan
                                    </p>
                                    <p>{data.note ? data.note : "-"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground pb-1">
                                        Lampiran
                                    </p>
                                    {data.attachment ? (
                                        <FilePreview file={filePreview} />
                                    ) : (
                                        <p>-</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end border-t pt-4">
                            <div className="text-right space-y-2">
                                <p className="text-sm text-gray-500">Nominal</p>
                                <p className="text-lg text-foreground font-semibold">
                                    {toRupiah(data.amount)}
                                </p>
                            </div>
                        </div>
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="default">Tutup</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export const TransactionDialog = ({
    open,
    onOpenChange,
    data,
}: TransactionDrawerProps) => {
    if (!data) return null;

    const filePreview: FilePreviewProps = {
        //http://localhost:8000/storage/transaksi-lampiran/OIP.jpeg

        type: data.attachment_mime_type!,
        name: data.attachment!,
        size:
            data.attachment_size > 10 ** 6
                ? `${Math.ceil(data.attachment_size / 10 ** 6)} Mb`
                : `${Math.ceil(data.attachment_size / 10 ** 3)} Kb`,
        url: `http://localhost:8000/storage/${data.attachment}`,
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="text-left">
                    <DialogTitle>Detail Transaksi</DialogTitle>
                    <DialogDescription>
                        <div className="space-y-8 pt-8 pb-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-foreground">
                                        ID Transaksi
                                    </p>
                                    <p>{data.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground">
                                        Tanggal
                                    </p>
                                    <p>
                                        {new Date(
                                            data.updated_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground">
                                        Nama
                                    </p>
                                    <p>{data.user.name}</p>
                                </div>
                                <div>
                                    <p className={`text-sm text-foreground`}>
                                        Type
                                    </p>
                                    <p
                                        className={`text-sm text-${data.category.is_expense ? "red-500" : "yellow-500"}`}
                                    >
                                        {data.category.is_expense
                                            ? "Pengeluaran"
                                            : "Pemasukan"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground">
                                        Kategori
                                    </p>
                                    <p>{data.category.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground">
                                        Deskripsi
                                    </p>
                                    <p>{data.category.description}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground">
                                        Catatan
                                    </p>
                                    <p>{data.note ? data.note : "-"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground pb-1">
                                        Lampiran
                                    </p>
                                    {data.attachment ? (
                                        <FilePreview file={filePreview} />
                                    ) : (
                                        <p>-</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-start border-t pt-4">
                            <div className="">
                                <p className="text-sm text-gray-500">Nominal</p>
                                <p className="text-lg text-foreground font-semibold">
                                    {toRupiah(data.amount)}
                                </p>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
