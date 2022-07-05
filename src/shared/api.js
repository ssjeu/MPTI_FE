import axios from 'axios';

const api = axios.create({
    baseURL: 'http://3.35.170.203'
});

const api2 = axios.create({
    baseURL: 'http://localhost:5001',
});

export const apis = {

	// community
    // postList: () => api.get(`/postList`),
    // postDetail: (postId) => api.get(`/posts/${postId}`)
    // commentList: () => api.get(`/comments`),
    // postWrite: (post) => api2.post(`/newPost`, post),

    postList: () => api.get(`/api/posts/postList`),
    postDetail: (postId) => api.get(`/api/posts/${postId}`),
    postWrite: () => api.post(`/api/posts`),
    postUpdate: (postId) => api.put(`/api/posts/${postId}`),
    postDelete: (postId) => api.delete(`/api/posts/${postId}`),

    commentWrite: (postId) => api.post(`/api/comments/${postId}`),
    commentUpdate: (postId) => api.put(`/api/comments/${postId}`),
    commentDelete: (postId) => api.delete(`/api/comments/${postId}`),


};