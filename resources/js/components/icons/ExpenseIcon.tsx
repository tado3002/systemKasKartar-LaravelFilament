import { cn } from "@/lib/utils"; // Jika kamu menggunakan utility class, sesuaikan path ini.

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export default function ExpenseIcon({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className={cn("icon", className)}
            {...props}
        >
            <path d="M12 17V9" />
            <path d="M9 14l3 3 3-3" />
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M6 8h.01" />
            <path d="M18 8h.01" />
        </svg>
    );
}
