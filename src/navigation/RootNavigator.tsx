import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../screens/auth/LoginScreen";
import { SignupScreen } from "../screens/auth/SignupScreen";
import { WelcomeScreen } from "../screens/auth/WelcomeScreen";

import { CareRequestHistoryScreen } from "../screens/care/CareRequestHistoryScreen";
import { CareRequestScreen } from "../screens/care/CareRequestScreen";
import { CareRequestSuccessScreen } from "../screens/care/CareRequestSuccessScreen";

import { HistoryScreen } from "../screens/history/HistoryScreen";
import { HomeScreen } from "../screens/home/HomeScreen";

import { IntakeQuestionsScreen } from "../screens/intake/IntakeQuestionsScreen";
import { IntakeResultScreen } from "../screens/intake/IntakeResultScreen";
import { IntakeReviewScreen } from "../screens/intake/IntakeReviewScreen";
import { IntakeStartScreen } from "../screens/intake/IntakeStartScreen";
import { SymptomSelectScreen } from "../screens/intake/SymptomSelectScreen";

import { NotificationsScreen } from "../screens/notifications/NotificationsScreen";
import { AnalyticsScreen } from "../screens/analytics/AnalyticsScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";

import { useAuthStore } from "../store/authStore";

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
};

export type AppStackParamList = {
  Home: undefined;

  IntakeStart: undefined;
  SymptomSelect: undefined;
  IntakeQuestions: undefined;
  IntakeReview: undefined;
  IntakeResult: undefined;

  History: undefined;
  Profile: undefined;
  Notifications: undefined;
  Analytics: undefined;

  CareRequest: undefined;
  CareRequestHistory: undefined;
  CareRequestSuccess: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={HomeScreen} />

      <AppStack.Screen name="IntakeStart" component={IntakeStartScreen} />
      <AppStack.Screen name="SymptomSelect" component={SymptomSelectScreen} />
      <AppStack.Screen name="IntakeQuestions" component={IntakeQuestionsScreen} />
      <AppStack.Screen name="IntakeReview" component={IntakeReviewScreen} />
      <AppStack.Screen name="IntakeResult" component={IntakeResultScreen} />

      <AppStack.Screen name="History" component={HistoryScreen} />
      <AppStack.Screen name="Profile" component={ProfileScreen} />
      <AppStack.Screen name="Notifications" component={NotificationsScreen} />
      <AppStack.Screen name="Analytics" component={AnalyticsScreen} />

      <AppStack.Screen name="CareRequest" component={CareRequestScreen} />
      <AppStack.Screen
        name="CareRequestHistory"
        component={CareRequestHistoryScreen}
      />
      <AppStack.Screen
        name="CareRequestSuccess"
        component={CareRequestSuccessScreen}
      />
    </AppStack.Navigator>
  );
}

export default function RootNavigator() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
