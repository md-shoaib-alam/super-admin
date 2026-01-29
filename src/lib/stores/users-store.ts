import { create } from 'zustand';
import { User } from '@/types';
import { mockUsers } from '@/lib/mock-data/users';

interface UsersState {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUsersBySchool: (schoolId: string) => User[];
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: mockUsers,
  
  addUser: (userData) => {
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
    };
    set((state) => ({ users: [...state.users, newUser] }));
  },
  
  updateUser: (id, data) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...data } : user
      ),
    }));
  },
  
  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },
  
  getUsersBySchool: (schoolId) => {
    return get().users.filter((user) => user.schoolId === schoolId);
  },
}));
