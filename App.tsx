import "react-native-gesture-handler";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import RootNavigator from "./src/navigation/RootNavigator";
import { useCareRequestStore } from "./src/store/careRequestStore";
import { useIntakeStore } from "./src/store/intakeStore";
import { useNotificationStore } from "./src/store/notificationStore";

export default function App() {
  const loadHistory = useIntakeStore((state) => state.loadHistory);
  const loadRequests = useCareRequestStore((state) => state.loadRequests);
  const loadNotifications = useNotificationStore(
    (state) => state.loadNotifications
  );

  useEffect(() => {
    loadHistory();
    loadRequests();
    loadNotifications();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <RootNavigator />
    </>
  );
}
