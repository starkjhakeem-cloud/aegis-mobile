import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { AppInput } from "../../components/AppInput";
import { ScreenContainer } from "../../components/ScreenContainer";
import { StatusBadge } from "../../components/StatusBadge";
import { colors, radius, spacing } from "../../constants/theme";
import { AppStackParamList } from "../../navigation/RootNavigator";
import {
  CareRequestStatus,
  useCareRequestStore,
} from "../../store/careRequestStore";

type Props = NativeStackScreenProps<AppStackParamList, "CareRequestHistory">;

type FilterOption = "All" | CareRequestStatus;

const filters: FilterOption[] = [
  "All",
  "Pending",
  "Reviewing",
  "Scheduled",
  "Closed",
];

const statusFlow: CareRequestStatus[] = [
  "Pending",
  "Reviewing",
  "Scheduled",
  "Closed",
];

function getStatusColor(status: CareRequestStatus) {
  if (status === "Pending") return colors.warning;
  if (status === "Reviewing") return colors.primary;
  if (status === "Scheduled") return colors.success;
  return colors.textSecondary;
}

export function CareRequestHistoryScreen({ navigation }: Props) {
  const requests = useCareRequestStore((state) => state.requests);
  const clearRequests = useCareRequestStore((state) => state.clearRequests);
  const updateRequestStatus = useCareRequestStore(
    (state) => state.updateRequestStatus
  );

  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = requests.filter((request) => {
    const matchesFilter =
      activeFilter === "All" || request.status === activeFilter;

    const matchesSearch =
      searchQuery.trim().length === 0 ||
      request.requestType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.contactMethod.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  function getNextStatus(current: CareRequestStatus): CareRequestStatus {
    const currentIndex = statusFlow.indexOf(current);
    return statusFlow[Math.min(currentIndex + 1, statusFlow.length - 1)];
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.title}>Care requests</Text>
          <Text style={styles.subtitle}>
            Search, filter, and manage care requests.
          </Text>
        </View>

        <AppInput
          label="Search"
          placeholder="Search type, message, or contact"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.filterRow}>
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {requests.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No care requests yet</Text>
            <Text style={styles.emptyText}>
              Submit a request after an intake to see it appear here.
            </Text>
          </View>
        ) : filteredRequests.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No matching requests</Text>
            <Text style={styles.emptyText}>
              Try changing your search or filter.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {filteredRequests.map((request) => {
              const nextStatus = getNextStatus(request.status);
              const isClosed = request.status === "Closed";
              const badgeColor = getStatusColor(request.status);

              return (
                <View key={request.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{request.requestType}</Text>
                    <StatusBadge label={request.status} color={badgeColor} />
                  </View>

                  <Text style={styles.cardText}>
                    Contact: {request.contactMethod}
                  </Text>
                  <Text style={styles.cardText}>{request.message}</Text>

                  <Text style={styles.dateText}>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </Text>

                  {!isClosed && (
                    <AppButton
                      title={`Move to ${nextStatus}`}
                      variant="secondary"
                      onPress={() =>
                        updateRequestStatus(request.id, nextStatus)
                      }
                    />
                  )}
                </View>
              );
            })}
          </View>
        )}

        <View style={styles.actions}>
          {requests.length > 0 && (
            <AppButton
              title="Clear Requests"
              variant="secondary"
              onPress={clearRequests}
            />
          )}

          <AppButton
            title="Back Home"
            variant="secondary"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
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
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  filterChip: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  emptyText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  list: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  cardText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  actions: {
    gap: spacing.md,
  },
});
