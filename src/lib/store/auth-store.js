import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      toggleAdminMode: () => 
        set((state) => ({
          user: state.user ? {
            ...state.user,
            role: state.user.role === 'admin' ? 'user' : 'admin'
          } : null
        })),
      isAdmin: () => {
        const state = useAuthStore.getState();
        return state.user?.role === 'admin';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);