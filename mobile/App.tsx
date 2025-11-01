import React from 'react';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import AppNavigation from './src/navigation';

const primaryColor = '#0F3D3E';
const accentColor = '#4FD1C5';

const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: primaryColor,
    secondary: accentColor,
    surface: '#FFFFFF',
    background: '#F7FAFC',
  },
};

const navigationTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: primaryColor,
    background: '#F7FAFC',
    card: '#FFFFFF',
    text: '#1A202C',
    border: '#E2E8F0',
  },
};

export default function App(): JSX.Element {
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar style="light" />
        <AppNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}
