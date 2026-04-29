import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { AppInput } from "../../components/AppInput";
import { ScreenContainer } from "../../components/ScreenContainer";
import { colors, radius, spacing } from "../../constants/theme";
import { AppStackParamList } from "../../navigation/RootNavigator";
import { useIntakeStore } from "../../store/intakeStore";

type Props = NativeStackScreenProps<AppStackParamList, "IntakeQuestions">;

export function IntakeQuestionsScreen({ navigation }: Props) {
  const {
    severity,
    duration,
    worsening,
    additionalSymptoms,
    medicationTaken,
    notes,
    setSeverity,
    setDuration,
    setWorsening,
    setAdditionalSymptoms,
    setMedicationTaken,
    setNotes,
  } = useIntakeStore();

  const canContinue = duration.trim().length > 0 && worsening !== null;

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.step}>Step 2 of 3</Text>
          <Text style={styles.title}>Tell us more</Text>
          <Text style={styles.subtitle}>
            This helps Aegis create a more useful triage summary.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Severity: {severity}/10</Text>

          <View style={styles.severityRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
              const selected = severity === number;

              return (
                <Pressable
                  key={number}
                  onPress={() => setSeverity(number)}
                  style={[
                    styles.severityButton,
                    selected && styles.severityButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.severityText,
                      selected && styles.severityTextSelected,
                    ]}
                  >
                    {number}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <AppInput
          label="When did this start?"
          placeholder="Example: 2 days ago"
          value={duration}
          onChangeText={setDuration}
        />

        <View style={styles.section}>
          <Text style={styles.label}>Is it getting worse?</Text>

          <View style={styles.choiceRow}>
            <Pressable
              onPress={() => setWorsening(true)}
              style={[styles.choice, worsening === true && styles.choiceSelected]}
            >
              <Text
                style={[
                  styles.choiceText,
                  worsening === true && styles.choiceTextSelected,
                ]}
              >
                Yes
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setWorsening(false)}
              style={[styles.choice, worsening === false && styles.choiceSelected]}
            >
              <Text
                style={[
                  styles.choiceText,
                  worsening === false && styles.choiceTextSelected,
                ]}
              >
                No
              </Text>
            </Pressable>
          </View>
        </View>

        <AppInput
          label="Additional symptoms"
          placeholder="Example: chills, sore throat, dizziness"
          value={additionalSymptoms}
          onChangeText={setAdditionalSymptoms}
        />

        <AppInput
          label="Medication taken"
          placeholder="Example: Tylenol, inhaler, none"
          value={medicationTaken}
          onChangeText={setMedicationTaken}
        />

        <AppInput
          label="Notes"
          placeholder="Anything else important?"
          value={notes}
          onChangeText={setNotes}
        />

        <View style={styles.actions}>
          <AppButton
            title="Back"
            variant="secondary"
            onPress={() => navigation.goBack()}
          />
          <AppButton
            title="Continue"
            disabled={!canContinue}
            onPress={() => navigation.navigate("IntakeReview")}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    padding: spacing.xl,
    gap: spacing.lg,
    paddingBottom: 120,
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
  section: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  severityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  severityButton: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  severityButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  severityText: {
    fontWeight: "800",
    color: colors.textPrimary,
  },
  severityTextSelected: {
    color: "#FFFFFF",
  },
  choiceRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  choice: {
    flex: 1,
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  choiceSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  choiceText: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  choiceTextSelected: {
    color: "#FFFFFF",
  },
  actions: {
    gap: spacing.md,
  },
});
