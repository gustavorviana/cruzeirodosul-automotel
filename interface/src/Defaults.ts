import axiosImport, { type AxiosStatic } from 'axios';
import { getCurrentSession } from './utils/UserUtils';
export const Url = "http://localhost:3000/";
declare global {
    var axios: AxiosStatic;
}

globalThis.axios = axiosImport.create() as any;

globalThis.axios.defaults.baseURL = Url;
globalThis.axios.defaults.headers.common['session'] = getCurrentSession()?.id as any;

export const axios = globalThis.axios;