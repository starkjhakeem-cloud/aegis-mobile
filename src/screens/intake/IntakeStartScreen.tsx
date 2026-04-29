import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import { colors, spacing } from "../../constants/theme";
import { AppStackParamList } from "../../navigation/RootNavigator";

type Props = NativeStackScreenProps<AppStackParamList, "IntakeStart">;

export function IntakeStartScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>New intake</Text>
          <Text style={styles.subtitle}>
            Answer a few guided questions so Aegis can prepare a structured triage summary.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Before we begin</Text>
          <Text style={styles.cardText}>
            This demo does not provide medical advice. If this is an emergency,
            call emergency services immediately.
          </Text>
        </View>

        <View style={styles.actions}>
          <AppButton title="Back" variant="secondary" onPress={() => navigation.goBack()} />
          <AppButton
            title="Begin Intake"
            onPress={() => navigation.navigate("SymptomSelect")}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
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
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  cardText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  actions: {
    gap: spacing.md,
  },
});
