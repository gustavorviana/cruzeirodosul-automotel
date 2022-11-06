import { axios } from '../Defaults';
import { getCookie, setCookie, deleteCookie } from '../Cookie';
const SESSION = 'session';
export function setCurrentSession(session: Session) {
    const jsonSession = JSON.stringify(session);

    globalThis.axios.defaults.headers.common['session'] = session.id;
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

export function hasPermission(code: string) {
    const user = getCurrentUser();
    if (!user)
        return false;

    return existsCode(user.group?.permissions, code);
}

function existsCode(permissions: Permission[], code: string) {
    code = code.toLowerCase();
    for (let i = 0; i < permissions.length; i++)
        if (permissions[i].code == code)
            return true;

    return false;
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