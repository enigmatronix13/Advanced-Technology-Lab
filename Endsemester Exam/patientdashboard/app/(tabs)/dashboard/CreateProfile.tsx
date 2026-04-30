import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const CreateProfile = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState<{name?: string; phone?: string; age?: string}>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{name: string; phone: string; age: string} | null>(null);

  const validate = () => {
    const newErrors: {name?: string; phone?: string; age?: string} = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = 'Name must contain only letters and spaces';
    }

    if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    const ageNum = Number(age);
    if (!age || isNaN(ageNum) || ageNum < 0) {
      newErrors.age = 'Age must be a non-negative number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmittedData({ name, phone, age });
      setSubmitted(true);
      setTimeout(() => {
        setName('');
        setPhone('');
        setAge('');
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Create Patient Profile</Text>
        <Text style={styles.subtitle}>Please enter your information below</Text>

        {submitted && submittedData && (
          <View style={styles.successMessage}>
            <Text style={styles.successTitle}>✓ Profile Created Successfully!</Text>
            <Text style={styles.successText}>Name: {submittedData.name}</Text>
            <Text style={styles.successText}>Phone: {submittedData.phone}</Text>
            <Text style={styles.successText}>Age: {submittedData.age}</Text>
          </View>
        )}

        <View style={styles.formContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors({...errors, name: undefined});
            }}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              if (errors.phone) setErrors({...errors, phone: undefined});
            }}
            placeholder="Enter 10-digit phone number"
            keyboardType="number-pad"
            maxLength={10}
            placeholderTextColor="#999"
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          <Text style={styles.label}>Age</Text>
          <TextInput
            style={[styles.input, errors.age && styles.inputError]}
            value={age}
            onChangeText={(text) => {
              setAge(text);
              if (errors.age) setErrors({...errors, age: undefined});
            }}
            placeholder="Enter your age"
            keyboardType="number-pad"
            placeholderTextColor="#999"
          />
          {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Profile</Text>
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
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fafafa',
    color: '#333',
  },
  inputError: {
    borderColor: '#dc3545',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
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

export default CreateProfile;
