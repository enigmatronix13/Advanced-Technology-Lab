import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@app_theme';

const themes = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    cardBackground: '#f5f5f5',
    buttonBackground: '#007AFF',
    borderColor: '#e0e0e0',
  },
  dark: {
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    cardBackground: '#2a2a2a',
    buttonBackground: '#0a7ae0',
    borderColor: '#444444',
  },
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference from AsyncStorage on app start
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Load theme preference from storage
  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading theme preference:', error);
      setIsLoading(false);
      Alert.alert('Error', 'Failed to load theme preference');
    }
  };

  // Save theme preference to AsyncStorage
  const saveThemePreference = async (isDark) => {
    try {
      const themeValue = isDark ? 'dark' : 'light';
      await AsyncStorage.setItem(THEME_STORAGE_KEY, themeValue);
    } catch (error) {
      console.error('Error saving theme preference:', error);
      Alert.alert('Error', 'Failed to save theme preference');
    }
  };

  // Handle theme toggle
  const handleThemeToggle = (value) => {
    setIsDarkMode(value);
    saveThemePreference(value);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#f5f5f5' }]}>
        <Text style={{ fontSize: 16, color: '#666' }}>Loading app...</Text>
      </SafeAreaView>
    );
  }

  const currentTheme = isDarkMode ? themes.dark : themes.light;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={[styles.headerTitle, { color: currentTheme.textColor }]}>
            Theme Switcher
          </Text>
          <Text style={[styles.headerSubtitle, { color: currentTheme.textColor }]}>
            Personalize your app experience
          </Text>
        </View>

        {/* Theme Toggle Card */}
        <View
          style={[
            styles.toggleCard,
            { backgroundColor: currentTheme.cardBackground },
            { borderColor: currentTheme.borderColor },
          ]}
        >
          <View style={styles.toggleContent}>
            <View>
              <Text style={[styles.toggleLabel, { color: currentTheme.textColor }]}>
                Dark Mode
              </Text>
              <Text
                style={[styles.toggleDescription, { color: currentTheme.textColor }]}
              >
                {isDarkMode ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
            <Switch
              style={styles.switch}
              trackColor={{ false: '#767577', true: '#81c784' }}
              thumbColor={isDarkMode ? '#4caf50' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleThemeToggle}
              value={isDarkMode}
            />
          </View>
        </View>

        {/* Theme Preview Cards */}
        <Text
          style={[
            styles.sectionTitle,
            { color: currentTheme.textColor, marginTop: 30 },
          ]}
        >
          Theme Preview
        </Text>

        {/* Sample Card 1 */}
        <View
          style={[
            styles.previewCard,
            { backgroundColor: currentTheme.cardBackground },
          ]}
        >
          <Text style={[styles.cardTitle, { color: currentTheme.textColor }]}>
            {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </Text>
          <Text
            style={[styles.cardDescription, { color: currentTheme.textColor }]}
          >
            Current theme is applied to this entire interface. Your preference
            is automatically saved and will be remembered when you reopen the app.
          </Text>
        </View>

        {/* Sample Card 2 */}
        <View
          style={[
            styles.previewCard,
            { backgroundColor: currentTheme.cardBackground },
          ]}
        >
          <Text style={[styles.cardTitle, { color: currentTheme.textColor }]}>
            ✨ Color Scheme
          </Text>
          <Text
            style={[styles.cardDescription, { color: currentTheme.textColor }]}
          >
            Background, text, and button colors are all tailored to provide an
            optimal visual experience in {isDarkMode ? 'dark' : 'light'} mode.
          </Text>
        </View>

        {/* Sample Card 3 */}
        <View
          style={[
            styles.previewCard,
            { backgroundColor: currentTheme.cardBackground },
          ]}
        >
          <Text style={[styles.cardTitle, { color: currentTheme.textColor }]}>
            💾 Persistent Storage
          </Text>
          <Text
            style={[styles.cardDescription, { color: currentTheme.textColor }]}
          >
            Your theme preference is stored in the local database using
            AsyncStorage. Even if you close the app, your choice will be
            remembered.
          </Text>
        </View>

        {/* Info Section */}
        <View style={[styles.infoBox, { backgroundColor: currentTheme.cardBackground }]}>
          <Text
            style={[styles.infoTitle, { color: currentTheme.textColor }]}
          >
            Current Theme Status
          </Text>
          <Text
            style={[styles.infoText, { color: currentTheme.textColor }]}
          >
            Mode: {isDarkMode ? 'Dark' : 'Light'}
          </Text>
          <Text
            style={[styles.infoText, { color: currentTheme.textColor }]}
          >
            Background: {isDarkMode ? '#1a1a1a' : '#ffffff'}
          </Text>
          <Text
            style={[styles.infoText, { color: currentTheme.textColor }]}
          >
            Text Color: {isDarkMode ? '#ffffff' : '#000000'}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text
            style={[styles.footerText, { color: currentTheme.textColor }]}
          >
            Toggle the switch above to change the theme
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  toggleCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  toggleDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  switch: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  previewCard: {
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  infoBox: {
    borderRadius: 12,
    padding: 18,
    marginTop: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'Courier New',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },
});
