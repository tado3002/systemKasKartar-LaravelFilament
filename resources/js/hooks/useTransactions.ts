import { Transaction } from "@/types/models/transaction";
import { PaginatedResponse } from "@/types/response/response";
import { Summary } from "@/types/response/summary";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type UseTransactionsOptions = {
    page: number;
    perPage: number;
};

// Fetch transactions
const fetchTransactions = async ({ page, perPage }: UseTransactionsOptions) => {
    console.log(page, perPage);
    const { data } = await axios.get<PaginatedResponse<Transaction>>(
        "/transactions",
        {
            params: {
                page,
                perPage,
            },
        },
    );
    return data;
};

// Fetch summary
const fetchSummary = async () => {
    const { data } = await axios.get("/transactions/summary");
    return data;
};

// Hook untuk transaksi
export const useTransactions = ({ page, perPage }: UseTransactionsOptions) => {
    return useQuery({
        queryKey: ["transactions", page, perPage],
        queryFn: () => fetchTransactions({ page, perPage }),
    });
};
// Hook untuk summary transaksi
export const useSummary = () => {
    return useQuery<Summary>({
        queryKey: ["transactionSummary"],
        queryFn: fetchSummary,
    });
};
