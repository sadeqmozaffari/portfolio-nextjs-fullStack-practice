import {api} from '../api';

const getPosts = () => api.get('/posts');

const getPostById = (id: number) => api.get(`/post?id=${id}`);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addPost = (data: any) => api.post('/post', data);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePost = (data: any) => api.put('/post', data);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deletePost = (data: any) => api.delete('/post', data);

export {getPosts, addPost, updatePost, deletePost, getPostById};
