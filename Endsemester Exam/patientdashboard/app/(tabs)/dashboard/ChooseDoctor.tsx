import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Lee', 'Dr. Patel'];
const timings = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM'];

const ChooseDoctor = () => {
  const router = useRouter();
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
  const [selectedTiming, setSelectedTiming] = useState(timings[0]);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{doctor: string; timing: string} | null>(null);

  const handleSubmit = () => {
    setSubmittedData({ doctor: selectedDoctor, timing: selectedTiming });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Book an Appointment</Text>
        <Text style={styles.subtitle}>Select your preferred doctor and timing</Text>

        {submitted && submittedData && (
          <View style={styles.successMessage}>
            <Text style={styles.successTitle}>✓ Appointment Booked Successfully!</Text>
            <Text style={styles.successText}>Doctor: {submittedData.doctor}</Text>
            <Text style={styles.successText}>Timing: {submittedData.timing}</Text>
          </View>
        )}

        <View style={styles.formContainer}>
          <Text style={styles.label}>Select Doctor</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedDoctor}
              onValueChange={setSelectedDoctor}
              style={styles.picker}
            >
              {doctors.map((doc) => (
                <Picker.Item label={doc} value={doc} key={doc} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Select Appointment Time</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedTiming}
              onValueChange={setSelectedTiming}
              style={styles.picker}
            >
              {timings.map((time) => (
                <Picker.Item label={time} value={time} key={time} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 16,
    color: '#1a73e8',
    fontWeight: '600',
  },
  content: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a73e8',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  successMessage: {
    backgroundColor: '#d4edda',
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
    padding: 16,
    borderRadius: 6,
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#155724',
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    color: '#155724',
    marginBottom: 4,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },
  picker: {
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#1a73e8',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 24,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChooseDoctor;
