import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { useNotificationStore } from "./notificationStore";

const STORAGE_KEY = "aegis_care_requests";

export type CareRequestStatus =
  | "Pending"
  | "Reviewing"
  | "Scheduled"
  | "Closed";

export type CareRequest = {
  id: string;
  requestType: string;
  contactMethod: string;
  message: string;
  status: CareRequestStatus;
  createdAt: string;
};

type CareRequestState = {
  requests: CareRequest[];
  isLoaded: boolean;

  loadRequests: () => Promise<void>;
  addRequest: (request: {
    requestType: string;
    contactMethod: string;
    message: string;
  }) => Promise<void>;

  updateRequestStatus: (id: string, status: CareRequestStatus) => Promise<void>;
  clearRequests: () => Promise<void>;
};

export const useCareRequestStore = create<CareRequestState>((set, get) => ({
  requests: [],
  isLoaded: false,

  loadRequests: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        set({
          requests: JSON.parse(stored),
          isLoaded: true,
        });
        return;
      }

      set({ isLoaded: true });
    } catch (error) {
      console.log("Failed to load care requests:", error);
      set({ isLoaded: true });
    }
  },

  addRequest: async (request) => {
    const state = get();

    const newRequest: CareRequest = {
      id: Date.now().toString(),
      ...request,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const updated = [newRequest, ...state.requests];

    set({ requests: updated });

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.log("Failed to save care request:", error);
    }

    await useNotificationStore.getState().addNotification({
      title: "Care request submitted",
      message: `${newRequest.requestType} was submitted and is now Pending.`,
    });

    setTimeout(() => {
      get().updateRequestStatus(newRequest.id, "Reviewing");
    }, 3000);

    setTimeout(() => {
      get().updateRequestStatus(newRequest.id, "Scheduled");
    }, 6000);
  },

  updateRequestStatus: async (id, status) => {
    const state = get();

    const request = state.requests.find((item) => item.id === id);

    const updated = state.requests.map((item) =>
      item.id === id ? { ...item, status } : item
    );

    set({ requests: updated });

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.log("Failed to update care request:", error);
    }

    if (request && request.status !== status) {
      await useNotificationStore.getState().addNotification({
        title: "Care request update",
        message: `${request.requestType} is now ${status}.`,
      });
    }
  },

  clearRequests: async () => {
    set({ requests: [] });

    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.log("Failed to clear care requests:", error);
    }
  },
}));
