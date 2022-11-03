import type { AxiosError } from "axios";

export function toBrDate(date?: Date | string) {
    if (!date)
        return '-';

    return new Date(date).toLocaleString();
}

export function refreshSystemIcons() {
    try { document.dispatchEvent(new Event("DOMContentLoaded")); } catch (error) { }
}

export function showAxiosError(error: AxiosError, defaultMessage: string) {
    const serverMsg = (error.response?.data as any)?.message;
    if (serverMsg)
        return alert(serverMsg);

    console.log(error);
    alert(defaultMessage);
}