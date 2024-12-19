import {api} from '../api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const register = (data: any) => api.post('/auth/register', data);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const login = (data: any) => api.post('/auth/login', data);

const logout = () => api.post('/auth/logout');
export {register, login, logout};
