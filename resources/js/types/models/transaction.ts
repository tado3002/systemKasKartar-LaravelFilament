import { Category } from "./category";
import { User } from "./user";

export type Transaction = {
    id: number;
    user_id: number;
    user: User;
    category_id: number;
    category: Category;
    amount: string;
    note: string | null;
    attachment: string | null;
    attachment_mime_type: string | null;
    attachment_size: number;
    created_at: string;
    updated_at: string;
};
