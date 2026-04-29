import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const STORAGE_KEY = "aegis_notifications";

export type AppNotification = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
};

type NotificationState = {
  notifications: AppNotification[];
  loadNotifications: () => Promise<void>;
  addNotification: (n: Omit<AppNotification, "id" | "createdAt">) => Promise<void>;
  clearNotifications: () => Promise<void>;
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],

  loadNotifications: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        set({ notifications: JSON.parse(stored) });
      }
    } catch (e) {
      console.log("Failed to load notifications");
    }
  },

  addNotification: async (n) => {
    const state = get();

    const newNotification: AppNotification = {
      id: Date.now().toString(),
      ...n,
      createdAt: new Date().toISOString(),
    };

    const updated = [newNotification, ...state.notifications];

    set({ notifications: updated });

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.log("Failed to save notification");
    }
  },

  clearNotifications: async () => {
    set({ notifications: [] });
    await AsyncStorage.removeItem(STORAGE_KEY);
  },
}));
