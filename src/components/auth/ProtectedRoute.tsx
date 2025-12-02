import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Box, CircularProgress, Typography } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = authService.isAuthenticated();
        
        if (authenticated) {
          // 如果有token，验证其有效性
          const isValid = await authService.validateToken();
          setIsAuthenticated(isValid);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('认证检查失败:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        gap={2}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          正在验证身份...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    // 保存当前路径，登录后可以重定向回来
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;