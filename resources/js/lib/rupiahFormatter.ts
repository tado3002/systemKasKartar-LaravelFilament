export function toRupiah(amount: string): string {
    return `Rp. ${parseInt(amount).toLocaleString("id-ID", {
        currency: "IDR",
    })}`;
}
