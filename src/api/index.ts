// src/api/index.js
const API_BASE =
  import.meta.env.DEV
    ? "http://localhost:8080/api"
    : "https://mypage-spring-backend.onrender.com/api";

export const login = (username: string, password: string) =>
  fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());

export const register = (username: string, password: string) =>
  fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());
