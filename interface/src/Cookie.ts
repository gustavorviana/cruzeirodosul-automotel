export function getCookie(cookieKey: string) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split('=');
        if (cookieKey == key)
            return value;
    }

    return null;
}

export function setCookie(key: string, value: string) {
    document.cookie = `${key}=${value}`;
}

export function deleteCookie(key: string) {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
}