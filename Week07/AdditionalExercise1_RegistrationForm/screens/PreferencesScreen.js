import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
} from 'react-native';

export default function PreferencesScreen({ route, navigation }) {
  const [newsletter, setNewsletter] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleNext = () => {
    navigation.navigate('Summary', {
      ...route.params,
      preferences: {
        newsletter,
        notifications,
        darkMode,
      },
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Step 2: Preferences</Text>
          <Text style={styles.stepInfo}>2 of 3</Text>
        </View>

        <View style={styles.preferencesForm}>
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceTextContainer}>
              <Text style={styles.preferenceLabel}>Subscribe to Newsletter</Text>
              <Text style={styles.preferenceDescription}>
                Receive updates and promotions
              </Text>
            </View>
            <Switch
              style={styles.switch}
              value={newsletter}
              onValueChange={setNewsletter}
              trackColor={{ false: '#767577', true: '#81c784' }}
              thumbColor={newsletter ? '#4caf50' : '#f4f3f4'}
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceTextContainer}>
              <Text style={styles.preferenceLabel}>Enable Notifications</Text>
              <Text style={styles.preferenceDescription}>
                Get notified about important updates
              </Text>
            </View>
            <Switch
              style={styles.switch}
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#81c784' }}
              thumbColor={notifications ? '#4caf50' : '#f4f3f4'}
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceTextContainer}>
              <Text style={styles.preferenceLabel}>Dark Mode</Text>
              <Text style={styles.preferenceDescription}>
                Use dark theme
              </Text>
            </View>
            <Switch
              style={styles.switch}
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#81c784' }}
              thumbColor={darkMode ? '#4caf50' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  stepInfo: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  preferencesForm: {
    flex: 1,
    marginBottom: 20,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  preferenceTextContainer: {
    flex: 1,
  },
  preferenceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  preferenceDescription: {
    fontSize: 13,
    color: '#999',
  },
  switch: {
    marginLeft: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
