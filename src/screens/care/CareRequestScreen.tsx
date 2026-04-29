import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { AppInput } from "../../components/AppInput";
import { ScreenContainer } from "../../components/ScreenContainer";
import { colors, radius, spacing } from "../../constants/theme";
import { AppStackParamList } from "../../navigation/RootNavigator";
import { useCareRequestStore } from "../../store/careRequestStore";

type Props = NativeStackScreenProps<AppStackParamList, "CareRequest">;

const requestTypes = [
  "Telehealth Callback",
  "Follow-up Appointment",
  "Prescription Refill",
];

const contactMethods = ["Phone", "Email", "Text"];

export function CareRequestScreen({ navigation }: Props) {
  const addRequest = useCareRequestStore((state) => state.addRequest);

  const [requestType, setRequestType] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit =
    requestType.length > 0 &&
    contactMethod.length > 0 &&
    message.trim().length > 0 &&
    !isSubmitting;

  async function handleSubmit() {
    if (!canSubmit) return;

    setIsSubmitting(true);

    setTimeout(async () => {
      await addRequest({
        requestType,
        contactMethod,
        message: message.trim(),
      });

      setIsSubmitting(false);
      navigation.navigate("CareRequestSuccess");
    }, 900);
  }

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.title}>Request care</Text>
          <Text style={styles.subtitle}>
            Submit a mock follow-up request based on your intake.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Request type</Text>

          <View style={styles.choiceList}>
            {requestTypes.map((type) => {
              const selected = requestType === type;

              return (
                <Pressable
                  key={type}
                  disabled={isSubmitting}
                  onPress={() => setRequestType(type)}
                  style={[styles.choice, selected && styles.choiceSelected]}
                >
                  <Text
                    style={[
                      styles.choiceText,
                      selected && styles.choiceTextSelected,
                    ]}
                  >
                    {type}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <AppInput
          label="Message"
          placeholder="Briefly describe what you need"
          value={message}
          onChangeText={setMessage}
          editable={!isSubmitting}
        />

        <View style={styles.section}>
          <Text style={styles.label}>Preferred contact method</Text>

          <View style={styles.choiceRow}>
            {contactMethods.map((method) => {
              const selected = contactMethod === method;

              return (
                <Pressable
                  key={method}
                  disabled={isSubmitting}
                  onPress={() => setContactMethod(method)}
                  style={[styles.contactChoice, selected && styles.choiceSelected]}
                >
                  <Text
                    style={[
                      styles.choiceText,
                      selected && styles.choiceTextSelected,
                    ]}
                  >
                    {method}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.actions}>
          <AppButton
            title="Back"
            variant="secondary"
            disabled={isSubmitting}
            onPress={() => navigation.goBack()}
          />
          <AppButton
            title={isSubmitting ? "Submitting..." : "Submit Request"}
            disabled={!canSubmit}
            loading={isSubmitting}
            onPress={handleSubmit}
          />
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
  section: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  choiceList: {
    gap: spacing.sm,
  },
  choiceRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  choice: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  contactChoice: {
    flex: 1,
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  choiceSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  choiceText: {
    color: colors.textPrimary,
    fontWeight: "800",
    fontSize: 14,
  },
  choiceTextSelected: {
    color: "#FFFFFF",
  },
  actions: {
    gap: spacing.md,
  },
});
