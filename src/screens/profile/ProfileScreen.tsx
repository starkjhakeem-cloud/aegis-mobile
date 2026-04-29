import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import { colors, spacing } from "../../constants/theme";
import { AppStackParamList } from "../../navigation/RootNavigator";
import { useAuthStore } from "../../store/authStore";

type Props = NativeStackScreenProps<AppStackParamList, "Profile">;

export function ProfileScreen({ navigation }: Props) {
  const logout = useAuthStore((state) => state.logout);

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>
            Manage your Aegis profile and health background.
          </Text>
        </View>

        <View style={styles.avatarCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>G</Text>
          </View>
          <Text style={styles.name}>Demo Patient</Text>
          <Text style={styles.email}>demo@aegis.app</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Health background</Text>
          <Text style={styles.cardText}>Allergies: Not added</Text>
          <Text style={styles.cardText}>Medications: Not added</Text>
          <Text style={styles.cardText}>Conditions: Not added</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Emergency contact</Text>
          <Text style={styles.cardText}>Name: Not added</Text>
          <Text style={styles.cardText}>Phone: Not added</Text>
        </View>

        <View style={styles.actions}>
          <AppButton
            title="Back Home"
            variant="secondary"
            onPress={() => navigation.navigate("Home")}
          />
          <AppButton title="Log Out" variant="secondary" onPress={logout} />
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
    paddingBottom: 120,
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
  avatarCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    gap: spacing.sm,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  cardText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  actions: {
    gap: spacing.md,
  },
});
