export function toDatetime(timestamp: string): string {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        year: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
    };
    const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(
        date,
    );
    return formattedDate;
}
