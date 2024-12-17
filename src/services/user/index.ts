import {api} from '../api';

const getUserInfo = () => api.get('/userInfo');

export {getUserInfo};
