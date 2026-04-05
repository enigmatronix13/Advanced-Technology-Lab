import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_STORAGE_KEY = '@progress_data';

export default function App() {
  const [progress, setProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(100);
  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Ready');

  // Animation value for progress bar
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Load progress data on app start
  useEffect(() => {
    loadProgressData();
  }, []);

  // Animate progress bar width
  const animateProgress = (targetProgress) => {
    Animated.timing(progressAnim, {
      toValue: targetProgress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  // Load progress from AsyncStorage
  const loadProgressData = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);
      if (savedProgress !== null) {
        const data = JSON.parse(savedProgress);
        setProgress(data.progress);
        setMaxProgress(data.maxProgress || 100);
        animateProgress((data.progress / (data.maxProgress || 100)) * 100);
        setStatusMessage(`Loaded: ${data.progress}/${data.maxProgress}`);
      }
    } catch (error) {
      console.error('Error loading progress data:', error);
      setStatusMessage('Error loading data');
    }
  };

  // Save progress to AsyncStorage
  const saveProgressData = async (progressValue, max) => {
    try {
      const data = {
        progress: progressValue,
        maxProgress: max,
        lastUpdated: new Date().toISOString(),
      };
      await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving progress data:', error);
      Alert.alert('Error', 'Failed to save progress data');
    }
  };

  // Simulate network sync with delay
  const handleSync = async () => {
    setIsSyncing(true);
    setStatusMessage('Syncing...');

    try {
      // Simulate network delay (2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate random progress value
      const newProgress = Math.floor(Math.random() * 100) + 1;
      const newMaxProgress = 100;

      // Update state
      setProgress(newProgress);
      setMaxProgress(newMaxProgress);

      // Animate to new progress
      animateProgress((newProgress / newMaxProgress) * 100);

      // Save to AsyncStorage
      await saveProgressData(newProgress, newMaxProgress);

      setStatusMessage(`Synced! Progress: ${newProgress}%`);
      setIsSyncing(false);

      Alert.alert('Success', `Progress updated to ${newProgress}%`);
    } catch (error) {
      console.error('Error during sync:', error);
      setStatusMessage('Sync failed');
      setIsSyncing(false);
      Alert.alert('Error', 'Failed to sync progress data');
    }
  };

  // Increment progress manually
  const incrementProgress = () => {
    if (progress >= maxProgress) {
      Alert.alert('Info', 'Maximum progress reached!');
      return;
    }

    const newProgress = Math.min(progress + 10, maxProgress);
    setProgress(newProgress);
    animateProgress((newProgress / maxProgress) * 100);
    saveProgressData(newProgress, maxProgress);
    setStatusMessage(`Progress: ${newProgress}/${maxProgress}`);
  };

  // Reset progress
  const resetProgress = () => {
    Alert.alert('Reset Progress', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        onPress: () => {
          setProgress(0);
          setMaxProgress(100);
          animateProgress(0);
          saveProgressData(0, 100);
          setStatusMessage('Progress reset');
        },
        style: 'destructive',
      },
    ]);
  };

  // Clear all data
  const clearData = async () => {
    Alert.alert('Clear All Data', 'This cannot be undone', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem(PROGRESS_STORAGE_KEY);
            setProgress(0);
            setMaxProgress(100);
            animateProgress(0);
            setStatusMessage('Data cleared');
          } catch (error) {
            Alert.alert('Error', 'Failed to clear data');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  // Get percentage text
  const percentageText = `${Math.round((progress / maxProgress) * 100)}%`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Progress Dashboard</Text>
          <Text style={styles.headerSubtitle}>Animated Progress Tracking</Text>
        </View>

        {/* Main Progress Section */}
        <View style={styles.progressSection}>
          {/* Progress Display */}
          <View style={styles.progressDisplay}>
            <Text style={styles.progressPercentage}>{percentageText}</Text>
            <Text style={styles.progressLabel}>Complete</Text>
          </View>

          {/* Animated Progress Bar */}
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>

          {/* Progress Info */}
          <View style={styles.progressInfo}>
            <Text style={styles.infoLabel}>Current:</Text>
            <Text style={styles.infoValue}>{progress}</Text>
            <Text style={styles.infoLabel}>Max:</Text>
            <Text style={styles.infoValue}>{maxProgress}</Text>
          </View>
        </View>

        {/* Status Message */}
        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text style={styles.statusMessage}>{statusMessage}</Text>
        </View>

        {/* Control Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.button, styles.syncButton]}
            onPress={handleSync}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>🔄 Sync Data</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.incrementButton]}
            onPress={incrementProgress}
            disabled={isSyncing}
          >
            <Text style={styles.buttonText}>➕ Increment</Text>
          </TouchableOpacity>
        </View>

        {/* Secondary Buttons */}
        <View style={styles.secondaryButtonSection}>
          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={resetProgress}
          >
            <Text style={styles.buttonText}>🔄 Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={clearData}
          >
            <Text style={styles.buttonText}>🗑️ Clear Data</Text>
          </TouchableOpacity>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>ℹ️ How it Works</Text>
          <Text style={styles.infoBoxText}>
            • Press "Sync Data" to fetch new progress (2s network delay simulation)
          </Text>
          <Text style={styles.infoBoxText}>
            • Progress bar animates smoothly to the new value
          </Text>
          <Text style={styles.infoBoxText}>
            • Data is saved to AsyncStorage automatically
          </Text>
          <Text style={styles.infoBoxText}>
            • Your progress persists even after closing the app
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  progressSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressDisplay: {
    alignItems: 'center',
    marginBottom: 25,
  },
  progressPercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  progressLabel: {
    fontSize: 16,
    color: '#666',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 3,
  },
  statusBox: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 12,
    color: '#0066cc',
    fontWeight: '600',
    marginBottom: 3,
  },
  statusMessage: {
    fontSize: 14,
    color: '#0066cc',
    fontWeight: '500',
  },
  buttonSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncButton: {
    backgroundColor: '#4CAF50',
  },
  incrementButton: {
    backgroundColor: '#FF9800',
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
  },
  clearButton: {
    backgroundColor: '#9C27B0',
  },
  secondaryButtonSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#fff3cd',
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
    padding: 15,
    borderRadius: 8,
  },
  infoBoxTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 10,
  },
  infoBoxText: {
    fontSize: 13,
    color: '#856404',
    marginBottom: 6,
    lineHeight: 18,
  },
});
