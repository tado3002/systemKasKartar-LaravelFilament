import { CardDashboard } from "@/components/dashboard/Cards";
import { TableTransactions } from "@/components/dashboard/Table";
import { ThemeProvider } from "@/components/theme-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { useSummary } from "@/hooks/useTransactions";
import HomeLayout from "@/Layouts/HomeLayout";
import { Head } from "@inertiajs/react";

export default function Finance() {
    const { data: summary, isLoading: isLoadingSummary } = useSummary();
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <HomeLayout>
                <Head title="Finance" />
                <div className="flex flex-col gap-6">
                    {/*Cards Section*/}
                    {isLoadingSummary ? (
                        <Skeleton className="flex h-40" />
                    ) : (
                        <CardDashboard data={summary!} />
                    )}

                    <TableTransactions />
                </div>
            </HomeLayout>
        </ThemeProvider>
    );
}
