import axios from 'axios';

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

const api = axios.create({
  baseURL: apiBaseUrl
});

export const getVoters = () => api.get('/voters');
export const createVoter = (payload) => api.post('/voters', payload);
export const updateVoter = (id, payload) => api.put(`/voters/${id}`, payload);
export const deleteVoter = (id, payload) => api.delete(`/voters/${id}`, { data: payload });

export const validateProfessor = (payload) => api.post('/professor/validate', payload);

export const getCandidates = () => api.get('/candidates');
export const createCandidate = (payload) => api.post('/candidates', payload);
export const updateCandidate = (id, payload) => api.put(`/candidates/${id}`, payload);
export const deleteCandidate = (id, payload) => api.delete(`/candidates/${id}`, { data: payload });

export const voteCandidate = (payload) => api.post('/vote', payload);
export const getResults = () => api.get('/results');
