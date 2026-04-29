import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import { colors, spacing } from "../../constants/theme";
import { AppStackParamList } from "../../navigation/RootNavigator";
import { useIntakeStore } from "../../store/intakeStore";

type Props = NativeStackScreenProps<AppStackParamList, "IntakeReview">;

export function IntakeReviewScreen({ navigation }: Props) {
  const {
    symptom,
    customSymptom,
    severity,
    duration,
    worsening,
    additionalSymptoms,
    medicationTaken,
    notes,
  } = useIntakeStore();

  const primarySymptom = customSymptom || symptom;

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Text style={styles.step}>Step 3 of 3</Text>
          <Text style={styles.title}>Review intake</Text>
          <Text style={styles.subtitle}>
            Confirm the details before submitting your intake.
          </Text>
        </View>

        <View style={styles.card}>
          <ReviewRow label="Primary symptom" value={primarySymptom} />
          <ReviewRow label="Severity" value={`${severity}/10`} />
          <ReviewRow label="Started" value={duration} />
          <ReviewRow label="Getting worse" value={worsening ? "Yes" : "No"} />
          <ReviewRow label="Additional symptoms" value={additionalSymptoms || "None"} />
          <ReviewRow label="Medication taken" value={medicationTaken || "None"} />
          <ReviewRow label="Notes" value={notes || "None"} />
        </View>

        <View style={styles.actions}>
          <AppButton
            title="Back"
            variant="secondary"
            onPress={() => navigation.goBack()}
          />
          <AppButton
            title="Submit Intake"
            onPress={() => navigation.navigate("IntakeResult")}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: spacing.xl,
    gap: spacing.xl,
    paddingBottom: 160,
  },
  step: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: spacing.xs,
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
    gap: spacing.md,
  },
  row: {
    gap: spacing.xs,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.textSecondary,
    textTransform: "uppercase",
  },
  rowValue: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  actions: {
    gap: spacing.md,
  },
});
