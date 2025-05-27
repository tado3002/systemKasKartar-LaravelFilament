import { Summary } from "@/types/response/summary";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { toRupiah } from "@/lib/rupiahFormatter";

interface CardDashboardProps {
    data: Summary;
}

export const CardDashboard = ({ data }: CardDashboardProps) => {
    return (
        <div>
            <div className="text-xl font-medium mb-3">Catatan Keuangan</div>
            <div className="p-2 bg-accent rounded-lg border grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/*Pemasukan Card*/}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Pemasukan</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl lg:text-4xl font-bold text-green-600">
                        {toRupiah(data.incomes)}
                    </CardContent>
                </Card>
                {/*Pengeluaran Card*/}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Pengeluaran</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl lg:text-4xl font-bold text-red-600">
                        {toRupiah(data.expenses)}
                    </CardContent>
                </Card>
                {/*Total Card*/}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Sisa</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl lg:text-4xl font-bold text-blue-600">
                        {toRupiah(data.balance)}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
