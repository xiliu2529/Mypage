// src/api/index.js
const API_BASE = "https://mypage-spring-backend.onrender.com/api";

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

// ✅ 获取书签列表
export const fetchBookmarks = (): Promise<{ name: string; url: string }[]> =>
  fetch(`${API_BASE}/bookmarks`).then((res) => {
    if (!res.ok) throw new Error("获取书签失败");
    return res.json();
  });

// ✅ 添加新书签
export const addBookmark = (bookmark: { name: string; url: string }) =>
  fetch(`${API_BASE}/bookmarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookmark),
  }).then((res) => {
    if (!res.ok) throw new Error("添加失败");
    return res.json();
  });
