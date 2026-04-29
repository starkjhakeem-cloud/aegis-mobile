export type UrgencyLevel = "Low" | "Moderate" | "High";

export type TriageResult = {
  urgency: UrgencyLevel;
  summary: string;
  concernCategory: string;
  recommendation: string;
  disclaimer: string;
};
