import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@animated_progress_dashboard';
const DEFAULT_PROGRESS = 0;
const MAX_PROGRESS = 100;
const SYNC_DELAY_MS = 2000;

export default function App() {
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [status, setStatus] = useState('Loading stored progress...');
  const [isSyncing, setIsSyncing] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadProgress();
  }, []);

  const animateToProgress = targetProgress => {
    progressAnim.stopAnimation();
    progressAnim.setValue(0);

    Animated.timing(progressAnim, {
      toValue: targetProgress / MAX_PROGRESS,
      duration: 900,
      useNativeDriver: false,
    }).start();
  };

  const loadProgress = async () => {
    try {
      const storedValue = await AsyncStorage.getItem(STORAGE_KEY);

      if (!storedValue) {
        setStatus('No saved data found. Tap Sync to fetch progress.');
        animateToProgress(DEFAULT_PROGRESS);
        return;
      }

      const parsedValue = JSON.parse(storedValue);
      const savedProgress = Math.max(
        DEFAULT_PROGRESS,
        Math.min(parsedValue.progress ?? DEFAULT_PROGRESS, MAX_PROGRESS),
      );

      setProgress(savedProgress);
      setStatus(`Loaded ${savedProgress}% from local storage.`);
      animateToProgress(savedProgress);
    } catch (error) {
      setStatus('Failed to load stored progress.');
      animateToProgress(DEFAULT_PROGRESS);
    }
  };

  const storeProgress = async nextProgress => {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        progress: nextProgress,
        updatedAt: new Date().toISOString(),
      }),
    );
  };

  const handleSync = () => {
    if (isSyncing) {
      return;
    }

    setIsSyncing(true);
    setStatus('Syncing with server...');

    setTimeout(async () => {
      try {
        const nextProgress = Math.floor(Math.random() * 101);

        await storeProgress(nextProgress);
        setProgress(nextProgress);
        setStatus(`Synced ${nextProgress}% and saved locally.`);
        animateToProgress(nextProgress);
      } catch (error) {
        setStatus('Sync failed. Please try again.');
      } finally {
        setIsSyncing(false);
      }
    }, SYNC_DELAY_MS);
  };

  const progressLabel = `${progress}%`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.kicker}>Additional Exercise</Text>
        <Text style={styles.title}>Animated Progress Dashboard</Text>
        <Text style={styles.subtitle}>
          Progress loads from AsyncStorage and animates from 0% to the saved value.
        </Text>

        <View style={styles.meterHeader}>
          <Text style={styles.meterLabel}>Local progress</Text>
          <Text style={styles.meterValue}>{progressLabel}</Text>
        </View>

        <View style={styles.barTrack}>
          <Animated.View
            style={[
              styles.barFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>

        <Text style={styles.status}>{status}</Text>

        <TouchableOpacity
          style={[styles.button, isSyncing && styles.buttonDisabled]}
          onPress={handleSync}
          activeOpacity={0.85}
          disabled={isSyncing}
        >
          {isSyncing ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Sync</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footer}>
          Sync waits {SYNC_DELAY_MS / 1000} seconds before updating local storage and replaying the animation.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1020',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#111936',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  kicker: {
    color: '#7dd3fc',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  title: {
    color: '#f8fafc',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 8,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 24,
  },
  meterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  meterLabel: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
  },
  meterValue: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '800',
  },
  barTrack: {
    height: 16,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#1f2a4a',
    marginBottom: 18,
  },
  barFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#38bdf8',
  },
  status: {
    color: '#dbeafe',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },
  button: {
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
  },
  buttonDisabled: {
    opacity: 0.75,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 16,
  },
});