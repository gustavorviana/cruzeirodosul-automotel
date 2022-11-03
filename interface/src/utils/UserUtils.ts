import { axios } from '../Defaults';
import { getCookie, setCookie, deleteCookie } from '../Cookie';
const SESSION = 'session';
export function setCurrentSession(session: Session) {
    const jsonSession = JSON.stringify(session);

    setCookie(SESSION, jsonSession);
}

export function getCurrentSession() {
    const jsonSession = getCookie('session');
    if (jsonSession)
        return JSON.parse(jsonSession) as Session;

    return null;
}

export function getCurrentUser() {
    return getCurrentSession()?.user ?? null;
}

export async function loginUser(email: string, password: string) {
    const response = await axios.post('api/logar', { email, password });

    if (response)
        setCurrentSession(response.data)

    return response;
}

export async function logoutUser() {
    const session = getCurrentSession();
    if (!session?.id)
        return;
    deleteCookie(SESSION);
    await axios.post('api/deslogar', { session: session.id });
}