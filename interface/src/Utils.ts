export function toBrDate(date?: Date | string) {
    if (!date)
        return '-';

    return new Date(date).toLocaleString();
}

export function refreshSystemIcons(){
    try { document.dispatchEvent(new Event("DOMContentLoaded")); } catch (error) { }
}