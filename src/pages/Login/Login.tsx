import { useState } from "react";
import { login, register } from "../../api";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // 登录 or 注册
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const hasUsernameError = username.trim() === "";
    const hasPasswordError = password.trim() === "";

    setUsernameError(hasUsernameError);
    setPasswordError(hasPasswordError);

    if (hasUsernameError || hasPasswordError) return;

    try {
      const fn = isLogin ? login : register;
      const data = await fn(username, password);

      if (data.success) {
        alert(isLogin ? "✅ 登录成功！" : "✅ 注册成功！");

        // 假设后端返回token字段叫token
        if (data.token) {
          localStorage.setItem("token", data.token);
          console.log("登录成功，token:", data.token);
        } else {
          console.warn("后端未返回 token");
        }

        // 登录成功后跳转主页（根据你的路由调整）
        navigate("/");
      } else {
        alert(
          `❌ ${isLogin ? "登录" : "注册"}失败：` + (data.message || "未知错误")
        );
      }
    } catch (err) {
      console.error("请求失败:", err);
      alert("⚠ 网络错误，请检查后端是否启动");
    }
  };

  return (
    <Container sx={{ width: "700px" }}>
      <Paper elevation={13} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? "登录" : "注册"}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label={usernameError ? "账号不能为空" : "账号"}
            error={usernameError}
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label={passwordError ? "密码不能为空" : "密码"}
            error={passwordError}
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" fullWidth onClick={handleSubmit}>
            {isLogin ? "登录" : "注册"}
          </Button>

          <Typography align="center" variant="body2" sx={{ mt: 2 }}>
            {isLogin ? (
              <>
                还没有账号？{" "}
                <Link
                  component="button"
                  onClick={() => setIsLogin(false)}
                  underline="hover"
                >
                  去注册
                </Link>
              </>
            ) : (
              <>
                已有账号？{" "}
                <Link
                  component="button"
                  onClick={() => setIsLogin(true)}
                  underline="hover"
                >
                  去登录
                </Link>
              </>
            )}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
