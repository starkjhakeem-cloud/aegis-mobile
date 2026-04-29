import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import { StatusBadge } from "../../components/StatusBadge";
import { colors, spacing } from "../../constants/theme";
import { AppStackParamList } from "../../navigation/RootNavigator";
import { useCareRequestStore } from "../../store/careRequestStore";
import { useIntakeStore } from "../../store/intakeStore";
import { getUrgency, getUrgencyColor } from "../../utils/triage";

type Props = NativeStackScreenProps<AppStackParamList, "Analytics">;

export function AnalyticsScreen({ navigation }: Props) {
  const history = useIntakeStore((state) => state.history);
  const requests = useCareRequestStore((state) => state.requests);

  const lowCount = history.filter((item) => getUrgency(item) === "Low").length;
  const moderateCount = history.filter((item) => getUrgency(item) === "Moderate").length;
  const highCount = history.filter((item) => getUrgency(item) === "High").length;

  const pendingCount = requests.filter((item) => item.status === "Pending").length;
  const reviewingCount = requests.filter((item) => item.status === "Reviewing").length;
  const scheduledCount = requests.filter((item) => item.status === "Scheduled").length;
  const closedCount = requests.filter((item) => item.status === "Closed").length;

  const averageSeverity =
    history.length === 0
      ? "0.0"
      : (
          history.reduce((total, item) => total + item.severity, 0) /
          history.length
        ).toFixed(1);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>
            View intake trends, urgency patterns, and request status metrics.
          </Text>
        </View>

        <View style={styles.statsRow}>
          <MetricCard label="Total intakes" value={String(history.length)} />
          <MetricCard label="Avg severity" value={averageSeverity} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Urgency breakdown</Text>

          <BreakdownRow label="Low" count={lowCount} color={getUrgencyColor("Low")} />
          <BreakdownRow
            label="Moderate"
            count={moderateCount}
            color={getUrgencyColor("Moderate")}
          />
          <BreakdownRow label="High" count={highCount} color={getUrgencyColor("High")} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Care request pipeline</Text>

          <BreakdownRow label="Pending" count={pendingCount} color={colors.warning} />
          <BreakdownRow label="Reviewing" count={reviewingCount} color={colors.primary} />
          <BreakdownRow label="Scheduled" count={scheduledCount} color={colors.success} />
          <BreakdownRow label="Closed" count={closedCount} color={colors.textSecondary} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>System summary</Text>
          <Text style={styles.cardText}>
            Aegis is currently tracking {history.length} intake
            {history.length === 1 ? "" : "s"} and {requests.length} care request
            {requests.length === 1 ? "" : "s"}.
          </Text>
          <Text style={styles.cardText}>
            Highest urgency count: {highCount}. Current scheduled requests:{" "}
            {scheduledCount}.
          </Text>
        </View>

        <AppButton
          title="Back Home"
          variant="secondary"
          onPress={() => navigation.navigate("Home")}
        />
      </ScrollView>
    </ScreenContainer>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function BreakdownRow({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: string;
}) {
  return (
    <View style={styles.breakdownRow}>
      <StatusBadge label={label} color={color} />
      <Text style={styles.breakdownCount}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    gap: spacing.xl,
    paddingBottom: 160,
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
  statsRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.textPrimary,
  },
  metricLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textSecondary,
    marginTop: spacing.xs,
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
    lineHeight: 22,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  breakdownCount: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.textPrimary,
  },
});
