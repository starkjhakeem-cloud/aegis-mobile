import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { AppInput } from "../../components/AppInput";
import { ScreenContainer } from "../../components/ScreenContainer";
import { StatusBadge } from "../../components/StatusBadge";
import { colors, radius, spacing } from "../../constants/theme";
import { AppStackParamList } from "../../navigation/RootNavigator";
import { useIntakeStore } from "../../store/intakeStore";
import { getUrgency, getUrgencyColor, UrgencyLabel } from "../../utils/triage";

type Props = NativeStackScreenProps<AppStackParamList, "History">;

type FilterOption = "All" | UrgencyLabel;
type SortOption = "Newest" | "Oldest" | "Severity High";

const filters: FilterOption[] = ["All", "Low", "Moderate", "High"];
const sortOptions: SortOption[] = ["Newest", "Oldest", "Severity High"];

export function HistoryScreen({ navigation }: Props) {
  const history = useIntakeStore((state) => state.history);
  const clearHistory = useIntakeStore((state) => state.clearHistory);

  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [activeSort, setActiveSort] = useState<SortOption>("Newest");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndSortedHistory = useMemo(() => {
    const filtered = history.filter((item) => {
      const primarySymptom = item.customSymptom || item.symptom;
      const urgency = getUrgency(item);

      const matchesFilter = activeFilter === "All" || urgency === activeFilter;

      const matchesSearch =
        searchQuery.trim().length === 0 ||
        primarySymptom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.duration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.additionalSymptoms.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.notes.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      if (activeSort === "Oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      if (activeSort === "Severity High") {
        return b.severity - a.severity;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [history, activeFilter, activeSort, searchQuery]);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.title}>Intake history</Text>
          <Text style={styles.subtitle}>
            Search, filter, and sort previous symptom intakes.
          </Text>
        </View>

        <AppInput
          label="Search"
          placeholder="Search symptom, notes, or duration"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Filter by urgency</Text>
          <View style={styles.chipRow}>
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <Pressable
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  style={[styles.chip, isActive && styles.chipActive]}
                >
                  <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Sort</Text>
          <View style={styles.chipRow}>
            {sortOptions.map((option) => {
              const isActive = activeSort === option;

              return (
                <Pressable
                  key={option}
                  onPress={() => setActiveSort(option)}
                  style={[styles.chip, isActive && styles.chipActive]}
                >
                  <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {history.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No intakes yet</Text>
            <Text style={styles.emptyText}>
              Complete your first intake to see it appear here.
            </Text>
          </View>
        ) : filteredAndSortedHistory.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No matching intakes</Text>
            <Text style={styles.emptyText}>
              Try changing your search, filter, or sort option.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {filteredAndSortedHistory.map((item) => {
              const primarySymptom = item.customSymptom || item.symptom;
              const urgency = getUrgency(item);
              const urgencyColor = getUrgencyColor(urgency);

              return (
                <View key={item.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{primarySymptom}</Text>
                    <StatusBadge label={urgency} color={urgencyColor} />
                  </View>

                  <Text style={styles.cardText}>Severity: {item.severity}/10</Text>
                  <Text style={styles.cardText}>Started: {item.duration}</Text>
                  <Text style={styles.cardText}>
                    Getting worse: {item.worsening ? "Yes" : "No"}
                  </Text>

                  {item.additionalSymptoms ? (
                    <Text style={styles.cardText}>
                      Additional: {item.additionalSymptoms}
                    </Text>
                  ) : null}

                  <Text style={styles.dateText}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        <View style={styles.actions}>
          {history.length > 0 ? (
            <AppButton
              title="Clear History"
              variant="secondary"
              onPress={clearHistory}
            />
          ) : null}

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
    paddingBottom: spacing.xxl,
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
  section: {
    gap: spacing.sm,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.textSecondary,
    textTransform: "uppercase",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  chipTextActive: {
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
