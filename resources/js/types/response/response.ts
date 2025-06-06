export type PaginationMeta = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export type PaginatedResponse<T> = {
    data: T[];
} & PaginationMeta;
