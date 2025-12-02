import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="60vh"
            textAlign="center"
            gap={2}
          >
            <Typography variant="h4" color="error" gutterBottom>
              哎呀，出现了一些问题
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              {this.state.error?.message || '应用遇到了意外错误，请稍后重试。'}
            </Typography>

            {this.state.error && (
              <Box
                sx={{
                  backgroundColor: 'grey.100',
                  padding: 2,
                  borderRadius: 1,
                  mt: 2,
                  mb: 2,
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  错误详情：
                </Typography>
                <Typography 
                  variant="body2" 
                  component="pre" 
                  sx={{ 
                    fontSize: '0.8rem',
                    overflow: 'auto',
                    maxHeight: '200px',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}
                >
                  {this.state.error.stack}
                </Typography>
              </Box>
            )}

            <Button 
              variant="contained" 
              onClick={this.handleRetry}
              size="large"
            >
              重试
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              如果问题持续存在，请检查：
              <br />
              • 后端服务是否正常运行
              <br />
              • 网络连接是否正常
              <br />
              • 数据库连接是否正常
            </Typography>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;