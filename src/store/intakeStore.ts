import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const STORAGE_KEY = "aegis_intake_history";

export type IntakeRecord = {
  id: string;
  symptom: string;
  customSymptom: string;
  severity: number;
  duration: string;
  worsening: boolean | null;
  additionalSymptoms: string;
  medicationTaken: string;
  notes: string;
  createdAt: string;
};

type IntakeState = {
  symptom: string;
  customSymptom: string;
  severity: number;
  duration: string;
  worsening: boolean | null;
  additionalSymptoms: string;
  medicationTaken: string;
  notes: string;

  history: IntakeRecord[];
  isHistoryLoaded: boolean;

  setSymptom: (symptom: string) => void;
  setCustomSymptom: (customSymptom: string) => void;
  setSeverity: (severity: number) => void;
  setDuration: (duration: string) => void;
  setWorsening: (worsening: boolean | null) => void;
  setAdditionalSymptoms: (additionalSymptoms: string) => void;
  setMedicationTaken: (medicationTaken: string) => void;
  setNotes: (notes: string) => void;

  loadHistory: () => Promise<void>;
  saveIntake: () => Promise<void>;
  resetIntake: () => void;
  clearHistory: () => Promise<void>;
};

const initialState = {
  symptom: "",
  customSymptom: "",
  severity: 5,
  duration: "",
  worsening: null,
  additionalSymptoms: "",
  medicationTaken: "",
  notes: "",
};

export const useIntakeStore = create<IntakeState>((set, get) => ({
  ...initialState,
  history: [],
  isHistoryLoaded: false,

  setSymptom: (symptom) => set({ symptom, customSymptom: "" }),
  setCustomSymptom: (customSymptom) => set({ customSymptom, symptom: "" }),
  setSeverity: (severity) => set({ severity }),
  setDuration: (duration) => set({ duration }),
  setWorsening: (worsening) => set({ worsening }),
  setAdditionalSymptoms: (additionalSymptoms) => set({ additionalSymptoms }),
  setMedicationTaken: (medicationTaken) => set({ medicationTaken }),
  setNotes: (notes) => set({ notes }),

  loadHistory: async () => {
    try {
      const storedHistory = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedHistory) {
        set({
          history: JSON.parse(storedHistory),
          isHistoryLoaded: true,
        });
        return;
      }

      set({ isHistoryLoaded: true });
    } catch (error) {
      console.log("Failed to load intake history:", error);
      set({ isHistoryLoaded: true });
    }
  },

  saveIntake: async () => {
    const state = get();

    const newRecord: IntakeRecord = {
      id: Date.now().toString(),
      symptom: state.symptom,
      customSymptom: state.customSymptom,
      severity: state.severity,
      duration: state.duration,
      worsening: state.worsening,
      additionalSymptoms: state.additionalSymptoms,
      medicationTaken: state.medicationTaken,
      notes: state.notes,
      createdAt: new Date().toISOString(),
    };

    const updatedHistory = [newRecord, ...state.history];

    set({ history: updatedHistory });

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.log("Failed to save intake history:", error);
    }
  },

  resetIntake: () => set(initialState),

  clearHistory: async () => {
    set({ history: [] });

    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.log("Failed to clear intake history:", error);
    }
  },
}));
