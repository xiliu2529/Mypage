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
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { ballOn, setBallOn, darkMode, toggleDarkMode, setVisible } =
    useAppContext();
  const theme = useTheme();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/user") {
      setVisible(false);
    }
  }, [location, setVisible]);

  // 样式变量改成依赖 theme
  const appBarSx = {
    backdropFilter: "blur(10px)",
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(255,255,255,0.6)"
        : "rgba(0,0,0,0.6)",
    color: theme.palette.text.primary,
    height: "70px",
  };

  const buttonSx = {
    fontSize: "1.5rem",
    color: ballOn ? "FF7043" : "#8CF7D4",
    transition: "color 0.3s ease",
  };

  const navStackSx = {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
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
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "3rem",
  };

  const linkCommonSx = {
    padding: "0.5rem",
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  };

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
            sx={linkCommonSx}
          >
            首页
          </Link>
          <Link
            component={RouterLink}
            to="/about"
            underline="none"
            sx={linkCommonSx}
          >
            关于
          </Link>
          <Link
            component={RouterLink}
            to="/login"
            underline="none"
            sx={linkCommonSx}
          >
            登录
          </Link>

          <Link
            component={RouterLink}
            to="/user"
            underline="none"
            sx={linkCommonSx}
          >
            用户名
          </Link>
        </Stack>
        <Button onClick={() => setBallOn(!ballOn)} sx={buttonSx}>
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
