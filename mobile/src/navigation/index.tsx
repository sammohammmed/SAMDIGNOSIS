import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AnalysisScreen from '../screens/AnalysisScreen';
import HistoryScreen from '../screens/HistoryScreen';

export type RootStackParamList = {
  Home: undefined;
  Analysis: {
    fileName: string;
    fileUri: string;
  };
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#F7FAFC' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Analysis" component={AnalysisScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
