import type { User } from '../types/user';

const API_BASE_URL = 'http://localhost:8080/api';

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    username: string;
    email?: string;
  };
}

interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    username: string;
    email?: string;
  };
}

class AuthService {
  private token: string | null = null;
  private currentUser: User | null = null;

  constructor() {
    // 从内存中获取token（不再使用localStorage）
    this.token = null;
    this.currentUser = null;
  }

  // 登录
  async login(username: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result: LoginResponse = await response.json();

      if (result.success && result.token && result.user) {
        this.token = result.token;
        this.currentUser = {
          id: result.user.id,
          username: result.user.username,
          email: result.user.email,
        };
        
        return {
          success: true,
          message: result.message,
          user: this.currentUser,
        };
      } else {
        return {
          success: false,
          message: result.message || '登录失败',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '登录失败，请检查网络连接',
      };
    }
  }

  // 注册
  async register(username: string, password: string, email?: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result: RegisterResponse = await response.json();

      if (result.success && result.user) {
        this.currentUser = {
          id: result.user.id,
          username: result.user.username,
          email: result.user.email,
        };

        return {
          success: true,
          message: result.message,
          user: this.currentUser,
        };
      } else {
        return {
          success: false,
          message: result.message || '注册失败',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '注册失败，请检查网络连接',
      };
    }
  }

  // 登出
  logout(): void {
    this.token = null;
    this.currentUser = null;
  }

  // 获取当前用户
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // 获取token
  getToken(): string | null {
    return this.token;
  }

  // 检查是否已登录
  isAuthenticated(): boolean {
    return this.token !== null && this.currentUser !== null;
  }

  // 获取认证头
  getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // 验证token有效性
  async validateToken(): Promise<boolean> {
    if (!this.token) {
      return false;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/validate`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return response.ok;
    } catch (error) {
      // Token无效，清除认证信息
      this.logout();
      return false;
    }
  }
}

// 导出单例实例
export const authService = new AuthService();