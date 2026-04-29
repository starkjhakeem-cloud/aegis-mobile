import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import { StatusBadge } from "../../components/StatusBadge";
import { colors, spacing } from "../../constants/theme";
import { AppStackParamList } from "../../navigation/RootNavigator";
import { useIntakeStore } from "../../store/intakeStore";
import { TriageResult } from "../../types/triage";
import { getUrgencyColor } from "../../utils/triage";

type Props = NativeStackScreenProps<AppStackParamList, "IntakeResult">;

function getMockTriageResult(
  severity: number,
  worsening: boolean | null
): TriageResult {
  if (severity >= 8 || worsening === true) {
    return {
      urgency: "High",
      summary: "Your intake indicates symptoms that may need urgent attention.",
      concernCategory: "Potential urgent concern",
      recommendation:
        "Consider urgent care or emergency care if symptoms feel severe.",
      disclaimer: "Demo only. This is not medical advice.",
    };
  }

  if (severity >= 5) {
    return {
      urgency: "Moderate",
      summary:
        "Your intake suggests symptoms that may benefit from a follow-up visit.",
      concernCategory: "Moderate symptom pattern",
      recommendation:
        "Consider scheduling a telehealth visit or monitoring closely.",
      disclaimer: "Demo only. This is not medical advice.",
    };
  }

  return {
    urgency: "Low",
    summary: "Your intake suggests a lower urgency symptom pattern.",
    concernCategory: "Low acuity pattern",
    recommendation: "Monitor symptoms and follow normal self-care guidance.",
    disclaimer: "Demo only. This is not medical advice.",
  };
}

export function IntakeResultScreen({ navigation }: Props) {
  const { severity, worsening, resetIntake, saveIntake } = useIntakeStore();
  const [isSaving, setIsSaving] = useState(false);

  const result = getMockTriageResult(severity, worsening);
  const urgencyColor = getUrgencyColor(result.urgency);

  async function saveWithDelay(next: "Home" | "CareRequest") {
    if (isSaving) return;

    setIsSaving(true);

    setTimeout(async () => {
      await saveIntake();

      if (next === "Home") {
        resetIntake();
      }

      setIsSaving(false);
      navigation.navigate(next);
    }, 700);
  }

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator
        alwaysBounceVertical
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Text style={styles.title}>Triage summary</Text>
          <Text style={styles.subtitle}>
            Aegis generated a structured summary from your intake.
          </Text>
        </View>

        <View style={styles.card}>
          <StatusBadge label={`${result.urgency} urgency`} color={urgencyColor} />

          <ResultSection label="Summary" value={result.summary} />
          <ResultSection label="Concern category" value={result.concernCategory} />
          <ResultSection
            label="Recommended next step"
            value={result.recommendation}
          />
        </View>

        <View style={styles.disclaimerCard}>
          <Text style={styles.disclaimer}>{result.disclaimer}</Text>
        </View>

        <View style={styles.spacer} />

        <View style={styles.actions}>
          <AppButton
            title={isSaving ? "Saving..." : "Request Care"}
            loading={isSaving}
            disabled={isSaving}
            onPress={() => saveWithDelay("CareRequest")}
          />
          <AppButton
            title={isSaving ? "Saving..." : "Back Home"}
            variant="secondary"
            disabled={isSaving}
            onPress={() => saveWithDelay("Home")}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function ResultSection({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <Text style={styles.sectionValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    padding: spacing.xl,
    gap: spacing.xl,
    paddingBottom: 220,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginTop: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.lg,
  },
  section: {
    gap: spacing.xs,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.textSecondary,
    textTransform: "uppercase",
  },
  sectionValue: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    lineHeight: 22,
  },
  disclaimerCard: {
    backgroundColor: colors.muted,
    borderRadius: 18,
    padding: spacing.lg,
  },
  disclaimer: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  spacer: {
    height: 40,
  },
  actions: {
    gap: spacing.md,
  },
});
