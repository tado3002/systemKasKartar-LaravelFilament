import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FileIcon, FileTextIcon, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
    file: {
        name: string;
        url: string;
        type: string;
        size: string;
    };
}

export const FilePreview = ({ file }: FilePreviewProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const getFileIcon = () => {
        switch (file.type) {
            case "image/jpeg":
                return <ImageIcon className="w-10 h-10 text-blue-500" />;
            case "pdf":
                return <FileIcon className="w-10 h-10 text-red-500" />;
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return <FileTextIcon className="w-10 h-10 text-blue-600" />;
            case "excel":
                return <FileIcon className="w-10 h-10 text-green-600" />;
            default:
                return <FileIcon className="w-8 h-8 text-gray-500" />;
        }
    };

    const renderPreviewContent = () => {
        if (file.type === "image/jpeg") {
            return (
                <img
                    src={file.url}
                    alt={file.name}
                    className="max-w-full max-h-[70vh] object-contain"
                />
            );
        }

        return (
            <div className="flex flex-col items-center justify-center p-4">
                {getFileIcon()}
                <p className="mt-4 text-lg font-medium">{file.name}</p>
                {file.size && (
                    <p className="text-sm text-gray-500 mt-1">{file.size}</p>
                )}
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => window.open(file.url, "_blank")}
                >
                    Download File
                </Button>
            </div>
        );
    };

    return (
        <>
            <div
                className="flex items-center p-2 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setIsOpen(true)}
            >
                <div className="mr-2">{getFileIcon()}</div>
                <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    {file.size && (
                        <p className="text-xs text-gray-500">{file.size}</p>
                    )}
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-[90vw] max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle className="truncate">
                            {file.name}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="overflow-auto flex justify-center items-center">
                        {renderPreviewContent()}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
