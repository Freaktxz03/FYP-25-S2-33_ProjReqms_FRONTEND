// src/Services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const register = (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

const AuthService = {
  register,
};

export default AuthService;
