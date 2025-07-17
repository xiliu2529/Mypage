// src/pages/Login.jsx
import  { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("https://mypage-spring-backend.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json(); // 统一返回 JSON，避免解析失败

      if (res.ok && data.success) {
        alert("✅ 登录成功！");
        // TODO: 例如保存登录状态 / 跳转
      } else {
        alert("❌ 登录失败：" + (data.message || "未知错误"));
      }
    } catch (err) {
      console.error("请求失败:", err);
      alert("⚠ 网络错误，请检查后端是否启动");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h1>登录</h1>
      <div style={{ marginBottom: "1rem" }}>
        <label>账号：</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="请输入账号"
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>密码：</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="请输入密码"
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>
      <button onClick={handleLogin} style={{ padding: "0.5rem 1rem" }}>
        登入
      </button>
    </div>
  );
};

export default Login;
