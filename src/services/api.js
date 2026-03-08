// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/api/",
});

// Interceptor: attach token only if endpoint is protected
API.interceptors.request.use((req) => {
  // Public endpoints that should NOT have token
  const publicEndpoints = [
    "accounts/register/",
    "accounts/verify-otp/",
    "accounts/login/",
    "accounts/forgot-password/",
  ];

  const isPublic = publicEndpoints.some((url) => req.url.includes(url));
  if (!isPublic) {
    const token = localStorage.getItem("access");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }

  return req;
});

export default API;