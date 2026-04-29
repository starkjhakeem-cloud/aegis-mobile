import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AppButton } from "../../components/AppButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import { colors, spacing } from "../../constants/theme";
import { AppStackParamList } from "../../navigation/RootNavigator";
import { useAuthStore } from "../../store/authStore";
import { useCareRequestStore } from "../../store/careRequestStore";
import { useIntakeStore } from "../../store/intakeStore";
import { useNotificationStore } from "../../store/notificationStore";
import { getUrgency, getUrgencyColor } from "../../utils/triage";

type Props = NativeStackScreenProps<AppStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const logout = useAuthStore((state) => state.logout);
  const history = useIntakeStore((state) => state.history);
  const requests = useCareRequestStore((state) => state.requests);
  const notifications = useNotificationStore((state) => state.notifications);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(18)).current;

  const latest = history[0];
  const latestUrgency = latest ? getUrgency(latest) : "None";

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View style={styles.contentGap}>
            <View>
              <Text style={styles.title}>Good afternoon</Text>
              <Text style={styles.subtitle}>Your Aegis dashboard is ready.</Text>
            </View>

            <View style={styles.statsRow}>
              <StatCard label="Intakes" value={String(history.length)} />
              <StatCard label="Requests" value={String(requests.length)} />
              <StatCard
                label="Urgency"
                value={latestUrgency}
                valueColor={getUrgencyColor(latestUrgency)}
              />
            </View>

            <Card
              title="Start a new intake"
              text="Answer guided questions and receive a structured triage summary."
              button="Start Intake"
              onPress={() => navigation.navigate("IntakeStart")}
            />

            <Card
              title="Intake history"
              text="View past symptom entries."
              button="View Intake History"
              onPress={() => navigation.navigate("History")}
            />

            <Card
              title="Care requests"
              text="Track submitted care requests."
              button="View Care Requests"
              onPress={() => navigation.navigate("CareRequestHistory")}
            />

            <Card
              title="Notifications"
              text={
                notifications.length === 0
                  ? "No notifications yet."
                  : `${notifications.length} notifications available.`
              }
              button="View Notifications"
              onPress={() => navigation.navigate("Notifications")}
            />

            <Card
              title="Analytics"
              text="View trends, urgency distribution, and system metrics."
              button="View Analytics"
              onPress={() => navigation.navigate("Analytics")}
            />

            <View style={styles.actions}>
              <AppButton
                title="Profile"
                variant="secondary"
                onPress={() => navigation.navigate("Profile")}
              />
              <AppButton title="Log Out" variant="secondary" onPress={logout} />
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </ScreenContainer>
  );
}

function Card({
  title,
  text,
  button,
  onPress,
}: {
  title: string;
  text: string;
  button: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{text}</Text>
      <AppButton title={button} variant="secondary" onPress={onPress} />
    </View>
  );
}

function StatCard({
  label,
  value,
  valueColor = colors.textPrimary,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  contentGap: {
    gap: spacing.lg,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "900",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  cardText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  actions: {
    gap: spacing.md,
  },
});
