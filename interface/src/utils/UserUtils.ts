import { Url } from '../Defaults';
import Cookies from 'js-cookie';
import axios from 'axios';
const SESSION = 'session';

export function setCurrentSession(session: Session) {
    const jsonSession = JSON.stringify(session);

    Cookies.set(SESSION, jsonSession);
}

export function getCurrentSession() {
    const jsonSession = Cookies.get(SESSION);
    if (jsonSession)
        return JSON.parse(jsonSession) as Session;

    return null;
}

export function getCurrentUser() {
    return getCurrentSession()?.user ?? null;
}

export async function loginUser(email: string, password: string) {
    const response = await axios.post(Url + 'api/login', { email, password });

    if (response)
        setCurrentSession(response.data)

    return response;
}

export async function logoutUser() {
    const session = getCurrentSession();
    if (!session?.id)
        return;

    Cookies.remove(SESSION);
    await axios.post(Url + 'api/logout', { session: session.id });
}