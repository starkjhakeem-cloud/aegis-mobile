import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { AppInput } from "../../components/AppInput";
import { ScreenContainer } from "../../components/ScreenContainer";
import { colors, radius, spacing } from "../../constants/theme";
import { AppStackParamList } from "../../navigation/RootNavigator";
import { useIntakeStore } from "../../store/intakeStore";

type Props = NativeStackScreenProps<AppStackParamList, "SymptomSelect">;

const symptoms = [
  "Headache",
  "Fever",
  "Cough",
  "Fatigue",
  "Nausea",
  "Dizziness",
  "Chest Pain",
  "Shortness of Breath",
  "Anxiety",
  "Sleep Issues",
  "Sore Throat",
  "Body Aches",
  "Stomach Pain",
  "Vomiting",
  "Rash",
  "Back Pain",
  "Ear Pain",
  "Sinus Pressure",
];

export function SymptomSelectScreen({ navigation }: Props) {
  const { symptom, customSymptom, setSymptom, setCustomSymptom } =
    useIntakeStore();

  const [localCustomSymptom, setLocalCustomSymptom] = useState(customSymptom);

  const canContinue = symptom.length > 0 || localCustomSymptom.trim().length > 0;

  function handleContinue() {
    if (localCustomSymptom.trim()) {
      setCustomSymptom(localCustomSymptom.trim());
    }

    navigation.navigate("IntakeQuestions");
  }

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Text style={styles.step}>Step 1 of 3</Text>
          <Text style={styles.title}>What are you experiencing?</Text>
          <Text style={styles.subtitle}>Choose a symptom or enter your own.</Text>
        </View>

        <View style={styles.grid}>
          {symptoms.map((item) => {
            const isSelected = symptom === item;

            return (
              <Pressable
                key={item}
                onPress={() => {
                  setSymptom(item);
                  setLocalCustomSymptom("");
                }}
                style={[styles.symptomChip, isSelected && styles.symptomChipSelected]}
              >
                <Text
                  style={[
                    styles.symptomText,
                    isSelected && styles.symptomTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <AppInput
          label="Custom symptom"
          placeholder="Describe what you're feeling"
          value={localCustomSymptom}
          onChangeText={(text) => {
            setLocalCustomSymptom(text);
            if (text.trim()) {
              setCustomSymptom(text);
            }
          }}
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
            onPress={handleContinue}
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  symptomChip: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  symptomChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  symptomText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  symptomTextSelected: {
    color: "#FFFFFF",
  },
  actions: {
    gap: spacing.md,
  },
});
