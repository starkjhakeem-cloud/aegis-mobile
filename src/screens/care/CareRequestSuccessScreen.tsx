import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import { colors, spacing } from "../../constants/theme";
import { AppStackParamList } from "../../navigation/RootNavigator";

type Props = NativeStackScreenProps<AppStackParamList, "CareRequestSuccess">;

export function CareRequestSuccessScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>✓</Text>
        </View>

        <Text style={styles.title}>Request submitted</Text>
        <Text style={styles.subtitle}>
          Aegis received your mock care request and will update the status automatically.
        </Text>

        <View style={styles.actions}>
          <AppButton
            title="View Request Status"
            onPress={() => navigation.navigate("CareRequestHistory")}
          />
          <AppButton
            title="Back Home"
            variant="secondary"
            onPress={() => navigation.navigate("Home")}
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
    justifyContent: "center",
    gap: spacing.xl,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 30,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  iconText: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "900",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: "center",
  },
  actions: {
    gap: spacing.md,
  },
});
