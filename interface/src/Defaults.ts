import axiosImport from 'axios';
import { getCurrentSession } from './utils/UserUtils';
export const Url = "http://localhost:3000/";

const instance = axiosImport.create();

instance.defaults.baseURL = Url;
instance.defaults.headers.common['session'] = getCurrentSession()?.id as any;

export const axios = instance;