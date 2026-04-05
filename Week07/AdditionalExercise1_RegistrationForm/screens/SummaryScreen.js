import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

export default function SummaryScreen({ route, navigation }) {
  const {
    firstName,
    lastName,
    email,
    preferences,
  } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    Alert.alert(
      'Registration Complete!',
      `Welcome ${firstName} ${lastName}! Your registration has been submitted successfully.`,
      [
        {
          text: 'Start Fresh',
          onPress: () => navigation.popToTop(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Step 3: Summary</Text>
          <Text style={styles.stepInfo}>3 of 3</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>First Name:</Text>
            <Text style={styles.detailValue}>{firstName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Name:</Text>
            <Text style={styles.detailValue}>{lastName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{email}</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Newsletter:</Text>
            <Text style={styles.detailValue}>
              {preferences.newsletter ? '✓ Subscribed' : '✗ Not subscribed'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Notifications:</Text>
            <Text style={styles.detailValue}>
              {preferences.notifications ? '✓ Enabled' : '✗ Disabled'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Dark Mode:</Text>
            <Text style={styles.detailValue}>
              {preferences.darkMode ? '✓ Enabled' : '✗ Disabled'}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
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
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 40,
    marginBottom: 20,
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
  submitButton: {
    flex: 1,
    backgroundColor: '#4caf50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
