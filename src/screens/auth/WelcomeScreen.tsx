import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import { colors, spacing } from "../../constants/theme";
import { AuthStackParamList } from "../../navigation/RootNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.brandBlock}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>A</Text>
          </View>

          <Text style={styles.title}>Aegis</Text>
          <Text style={styles.subtitle}>
            AI-powered health intake and care navigation.
          </Text>
        </View>

        <View style={styles.actionBlock}>
          <AppButton title="Create Account" onPress={() => navigation.navigate("Signup")} />
          <AppButton title="Log In" variant="secondary" onPress={() => navigation.navigate("Login")} />

          <Text style={styles.disclaimer}>
            Demo project only. Not medical advice.
          </Text>
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
  brandBlock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 310,
  },
  actionBlock: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  disclaimer: {
    textAlign: "center",
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
