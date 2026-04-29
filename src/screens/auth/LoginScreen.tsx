import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { AppInput } from "../../components/AppInput";
import { ScreenContainer } from "../../components/ScreenContainer";
import { colors, spacing } from "../../constants/theme";
import { AuthStackParamList } from "../../navigation/RootNavigator";
import { useAuthStore } from "../../store/authStore";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const login = useAuthStore((state) => state.login);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Log in to continue your care intake.</Text>
        </View>

        <View style={styles.form}>
          <AppInput label="Email" placeholder="you@example.com" autoCapitalize="none" />
          <AppInput label="Password" placeholder="Enter password" secureTextEntry />

          <AppButton title="Log In" onPress={login} />
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
