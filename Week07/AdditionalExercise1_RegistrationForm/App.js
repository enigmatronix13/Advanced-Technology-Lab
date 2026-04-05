import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalDetailsScreen from './screens/PersonalDetailsScreen';
import PreferencesScreen from './screens/PreferencesScreen';
import SummaryScreen from './screens/SummaryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#fff' },
        }}
        initialRouteName="PersonalDetails"
      >
        <Stack.Screen
          name="PersonalDetails"
          component={PersonalDetailsScreen}
          options={{ title: 'Personal Details' }}
        />
        <Stack.Screen
          name="Preferences"
          component={PreferencesScreen}
          options={{ title: 'Preferences' }}
        />
        <Stack.Screen
          name="Summary"
          component={SummaryScreen}
          options={{ title: 'Summary' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
