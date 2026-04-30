import { Image } from 'expo-image';
import { Platform, StyleSheet, ScrollView, View, Text } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <ThemedText style={styles.title}>Patient Dashboard</ThemedText>
          <ThemedText style={styles.subtitle}>Manage your healthcare appointments and profile</ThemedText>
        </View>

        <View style={styles.card}>
          <View style={styles.cardIcon}>
            <Text style={styles.iconText}>👤</Text>
          </View>
          <ThemedText style={styles.cardTitle}>Create Profile</ThemedText>
          <ThemedText style={styles.cardDescription}>Enter your personal information including name, phone number, and age</ThemedText>
          <Link href="/(tabs)/dashboard/CreateProfile">
            <View style={styles.linkButton}>
              <ThemedText style={styles.linkText}>Go to Profile</ThemedText>
            </View>
          </Link>
        </View>

        <View style={styles.card}>
          <View style={styles.cardIcon}>
            <Text style={styles.iconText}>🏥</Text>
          </View>
          <ThemedText style={styles.cardTitle}>Book Appointment</ThemedText>
          <ThemedText style={styles.cardDescription}>Select a doctor and choose your preferred appointment time slot</ThemedText>
          <Link href="/(tabs)/dashboard/ChooseDoctor">
            <View style={styles.linkButton}>
              <ThemedText style={styles.linkText}>Book Now</ThemedText>
            </View>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    padding: 20,
    paddingTop: 30,
  },
  headerSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a73e8',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardIcon: {
    marginBottom: 12,
  },
  iconText: {
    fontSize: 40,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  linkButton: {
    backgroundColor: '#1a73e8',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
