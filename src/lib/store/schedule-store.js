import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useScheduleStore = create()(
  persist(
    (set) => ({
      schedules: [],
      isFormOpen: false,
      editingSchedule: null,

      setIsFormOpen: (isOpen) => set({ isFormOpen: isOpen }),
      setEditingSchedule: (schedule) => set({ editingSchedule: schedule }),

      addSchedule: async (schedule) => {
        set((state) => ({
          schedules: [
            ...state.schedules,
            {
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date().toISOString(),
              ...schedule,
            },
          ],
          isFormOpen: false,
          editingSchedule: null,
        }));
      },

      updateSchedule: async (id, updatedSchedule) => {
        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === id
              ? {
                  ...schedule,
                  ...updatedSchedule,
                  updatedAt: new Date().toISOString(),
                }
              : schedule
          ),
          isFormOpen: false,
          editingSchedule: null,
        }));
      },

      deleteSchedule: async (id) => {
        set((state) => ({
          schedules: state.schedules.filter((schedule) => schedule.id !== id),
        }));
      },

      getScheduleById: (id) => {
        const state = useScheduleStore.getState();
        return state.schedules.find((schedule) => schedule.id === id);
      },

      getActiveSchedules: () => {
        const state = useScheduleStore.getState();
        return state.schedules.filter((schedule) => schedule.status === 'Active');
      },
    }),
    {
      name: 'schedule-storage',
    }
  )
);