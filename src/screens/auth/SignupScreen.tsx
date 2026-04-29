import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { AppInput } from "../../components/AppInput";
import { ScreenContainer } from "../../components/ScreenContainer";
import { colors, spacing } from "../../constants/theme";
import { AuthStackParamList } from "../../navigation/RootNavigator";
import { useAuthStore } from "../../store/authStore";

type Props = NativeStackScreenProps<AuthStackParamList, "Signup">;

export function SignupScreen({ navigation }: Props) {
  const login = useAuthStore((state) => state.login);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>
            Start your guided health intake experience.
          </Text>
        </View>

        <View style={styles.form}>
          <AppInput label="Email" placeholder="you@example.com" autoCapitalize="none" />
          <AppInput label="Password" placeholder="Create password" secureTextEntry />
          <AppInput label="Confirm Password" placeholder="Confirm password" secureTextEntry />

          <AppButton title="Create Account" onPress={login} />
          <AppButton title="Back" variant="secondary" onPress={() => navigation.goBack()} />
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
    gap: spacing.xxl,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  form: {
    gap: spacing.md,
  },
});
