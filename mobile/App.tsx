import { StatusBar } from 'expo-status-bar'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { colors } from './src/theme/colors'
import { DashboardScreen } from './src/screens/DashboardScreen'
import { PatientsScreen } from './src/screens/PatientsScreen'
import { PatientDetailScreen } from './src/screens/PatientDetailScreen'
import { SettingsScreen } from './src/screens/SettingsScreen'

export type RootStackParamList = {
  MainTabs: undefined
  PatientDetail: { patientId: string; patientName: string }
}

export type MainTabsParamList = {
  Dashboard: undefined
  Patients: undefined
  Settings: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<MainTabsParamList>()

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background
  }
}

const tabIconMap: Record<keyof MainTabsParamList, React.ComponentProps<typeof Ionicons>['name']> = {
  Dashboard: 'speedometer-outline',
  Patients: 'people-outline',
  Settings: 'settings-outline'
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          elevation: 0,
          height: 70,
          paddingBottom: 12,
          paddingTop: 12
        },
        tabBarIcon: ({ color, size }) => {
          const iconName = tabIconMap[route.name]
          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Patients" component={PatientsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar style="dark" />
        <Stack.Navigator>
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen
            name="PatientDetail"
            component={PatientDetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
