import { defineStore } from 'pinia';

interface User {
  id: number;
  username: string;
  email?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  
  actions: {
    async login(username: string, password: string) {
      // 模拟API调用
      // 实际项目中，这里应该调用真实的登录API
      const mockUser = {
        id: 1,
        username,
        email: `${username}@example.com`,
      };
      
      const mockToken = 'mock_token_' + Date.now();
      
      // 保存到 state
      this.user = mockUser;
      this.token = mockToken;
      
      // 保存到 localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
    },
    
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    
    // 检查并恢复登录状态
    checkAuth() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      }
    },
  },
});