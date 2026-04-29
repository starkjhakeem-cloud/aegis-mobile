import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/theme";

type StatusBadgeProps = {
  label: string;
  color?: string;
};

export function StatusBadge({
  label,
  color = colors.primary,
}: StatusBadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});
