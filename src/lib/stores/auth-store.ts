import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    // Mock authentication - accept any email with password "admin123"
    if (password === 'admin123') {
      const mockUser: User = {
        id: 'admin-1',
        name: 'Admin User',
        email: email,
        role: 'super_admin',
        schoolId: null,
        status: 'active',
        avatar: 'https://i.pravatar.cc/150?u=admin1',
        joinedDate: new Date().toISOString(),
      };
      
      set({ user: mockUser, isAuthenticated: true });
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
