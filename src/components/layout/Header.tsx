import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  Stack,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useState, useEffect } from "react";
import trinity from "../../assets/trinity.png";
import { useAppContext } from "../../context/useAppContext";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const Header = () => {
  const { ballOn, setBallOn, darkMode, toggleDarkMode, setVisible } =
    useAppContext();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);



  // 监听认证状态变化
  useEffect(() => {
    const checkAuthStatus = () => {
      setCurrentUser(authService.getCurrentUser());
    };

    // 页面加载时检查认证状态
    checkAuthStatus();
    
    // 定期检查认证状态（可选）
    const interval = setInterval(checkAuthStatus, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    handleMenuClose();
    navigate('/');
  };



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
          {currentUser ? (
            <>
              <Link
                component={RouterLink}
                to="/user"
                underline="none"
                sx={linkCommonSx}
              >
                {currentUser.username}
              </Link>
              <Button
                onClick={handleMenuOpen}
                sx={{ 
                  ...linkCommonSx, 
                  minWidth: 'auto', 
                  padding: '8px 12px',
                  textTransform: 'none'
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: theme.palette.primary.main 
                  }}
                >
                  {currentUser.username.charAt(0).toUpperCase()}
                </Avatar>
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleLogout}>
                  登出
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link
              component={RouterLink}
              to="/login"
              underline="none"
              sx={linkCommonSx}
            >
              登录
            </Link>
          )}
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
