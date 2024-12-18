import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User | null, token: string | null) => void;
  logout: () => void;
  toggleAdminMode: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      toggleAdminMode: () => set((state) => ({
        user: state.user ? {
          ...state.user,
          role: state.user.role === 'admin' ? 'user' : 'admin'
        } : null
      })),
    }),
    {
      name: 'auth-storage',
    }
  )
);