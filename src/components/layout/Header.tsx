import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  Stack,
  Button,
} from "@mui/material";
import trinity from "../../assets/trinity.png";
import { useAppContext } from "../../context/useAppContext";

// 提取样式变量
const appBarSx = {
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  color: "#222",
  height: "70px",
};

const buttonSx = (ballOn: boolean) => ({
  fontSize: "1.5rem",
  color: ballOn ? "green" : "red",
  transition: "color 0.3s ease",
});

const navStackSx = {
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  gap: "16px", // spacing=2 = 8 * 2 = 16px
};

const toolbarSx = {
  justifyContent: "space-between",
  fontSize: "2rem",
};

const logoImgSx = {
  height: 40,
  width: "auto",
  mr: 2,
};

const logoTextSx = {
  textDecoration: "none",
  color: "inherit",
  fontWeight: "bold",
  fontSize: "3rem",
};

const linkCommonSx = {
  padding: "0.5rem",
  "&:hover": {
    color: "#28dbb5ff",
  },
};

const Header = () => {
  const { ballOn, setBallOn, darkMode, toggleDarkMode } = useAppContext();
  console.log("darkMode", darkMode);

  return (
    <AppBar position="fixed" elevation={3} sx={appBarSx}>
      <Toolbar sx={toolbarSx}>
        {/* Logo 区域 */}
        <Box display="flex" alignItems="center">
          <Box component="img" src={trinity} alt="Logo" sx={logoImgSx} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={logoTextSx}
          >
            Xiliu
          </Typography>
        </Box>
        {/* 导航链接 */}
        <Stack direction="row" sx={navStackSx} spacing={2}>
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            color="text.primary"
            sx={linkCommonSx}
          >
            首页
          </Link>

          <Link
            component={RouterLink}
            to="/about"
            underline="none"
            color="text.primary"
            sx={linkCommonSx}
          >
            关于
          </Link>

          <Link
            component={RouterLink}
            to="/login"
            underline="none"
            color="text.primary"
            sx={linkCommonSx}
          >
            登录
          </Link>
        </Stack>
        <Button onClick={() => setBallOn(!ballOn)} sx={buttonSx(ballOn)}>
          跟随
        </Button>
        <Button onClick={toggleDarkMode} sx={{ fontSize: "1.5rem" }}>
          {darkMode ? "明" : "暗"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
