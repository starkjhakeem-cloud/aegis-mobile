import { colors } from "../constants/theme";
import { IntakeRecord } from "../store/intakeStore";

export type UrgencyLabel = "Low" | "Moderate" | "High";

export function getUrgency(record: IntakeRecord): UrgencyLabel {
  if (record.severity >= 8) return "High";

  if (record.severity >= 6 && record.worsening === true) return "High";

  if (record.severity >= 4) return "Moderate";

  if (record.worsening === true) return "Moderate";

  return "Low";
}

export function getUrgencyColor(urgency: string) {
  if (urgency === "High") return colors.danger;
  if (urgency === "Moderate") return colors.warning;
  if (urgency === "Low") return colors.success;
  return colors.textSecondary;
}
