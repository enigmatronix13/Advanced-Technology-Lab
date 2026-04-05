import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SURVEY_QUESTIONS = [
  {
    id: 1,
    question: 'What is your name?',
    type: 'text',
    required: true,
  },
  {
    id: 2,
    question: 'How satisfied are you with our service?',
    type: 'radio',
    options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
    required: true,
  },
  {
    id: 3,
    question: 'Would you recommend us to others?',
    type: 'switch',
    required: true,
  },
  {
    id: 4,
    question: 'What can we improve?',
    type: 'text',
    required: false,
  },
  {
    id: 5,
    question: 'Select your interests:',
    type: 'checkbox',
    options: ['Technology', 'Sports', 'Music', 'Travel', 'Food'],
    required: false,
  },
];

export default function App() {
  const [answers, setAnswers] = useState({});
  const [currentSection, setCurrentSection] = useState('survey'); // 'survey' or 'summary'
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

  const handleTextAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleRadioAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSwitchAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleCheckboxToggle = (questionId, option) => {
    const key = `q${questionId}`;
    const current = selectedCheckboxes[key] || [];
    const updated = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];
    setSelectedCheckboxes({ ...selectedCheckboxes, [key]: updated });
    setAnswers({ ...answers, [questionId]: updated });
  };

  const validateAnswers = () => {
    for (const question of SURVEY_QUESTIONS) {
      if (question.required && !answers[question.id]) {
        Alert.alert(
          'Validation Error',
          `Please answer the required question: ${question.question}`
        );
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateAnswers()) {
      setCurrentSection('summary');
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSelectedCheckboxes({});
    setCurrentSection('survey');
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'text':
        return (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {question.question}
              {question.required && <Text style={styles.required}> *</Text>}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your answer"
              value={answers[question.id] || ''}
              onChangeText={(value) => handleTextAnswer(question.id, value)}
              multiline={true}
              numberOfLines={3}
              placeholderTextColor="#999"
            />
          </View>
        );

      case 'radio':
        return (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {question.question}
              {question.required && <Text style={styles.required}> *</Text>}
            </Text>
            {question.options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.radioOption}
                onPress={() => handleRadioAnswer(question.id, option)}
              >
                <View
                  style={[
                    styles.radioButton,
                    answers[question.id] === option && styles.radioButtonSelected,
                  ]}
                >
                  {answers[question.id] === option && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'switch':
        return (
          <View key={question.id} style={styles.questionContainer}>
            <View style={styles.switchQuestion}>
              <Text style={styles.questionText}>
                {question.question}
                {question.required && <Text style={styles.required}> *</Text>}
              </Text>
              <Switch
                value={answers[question.id] || false}
                onValueChange={(value) => handleSwitchAnswer(question.id, value)}
                trackColor={{ false: '#767577', true: '#81c784' }}
                thumbColor={answers[question.id] ? '#4caf50' : '#f4f3f4'}
              />
            </View>
          </View>
        );

      case 'checkbox':
        return (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {question.question}
              {question.required && <Text style={styles.required}> *</Text>}
            </Text>
            {question.options.map((option) => {
              const isChecked =
                (selectedCheckboxes[`q${question.id}`] || []).includes(option);
              return (
                <TouchableOpacity
                  key={option}
                  style={styles.checkboxOption}
                  onPress={() => handleCheckboxToggle(question.id, option)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      isChecked && styles.checkboxChecked,
                    ]}
                  >
                    {isChecked && (
                      <Icon name="check" size={16} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );

      default:
        return null;
    }
  };

  if (currentSection === 'summary') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Survey Summary</Text>
          </View>

          {SURVEY_QUESTIONS.map((question) => (
            <View key={question.id} style={styles.summaryItem}>
              <Text style={styles.summaryQuestion}>{question.question}</Text>
              <Text style={styles.summaryAnswer}>
                {Array.isArray(answers[question.id])
                  ? answers[question.id].join(', ')
                  : typeof answers[question.id] === 'boolean'
                  ? answers[question.id]
                    ? 'Yes'
                    : 'No'
                  : answers[question.id]}
              </Text>
            </View>
          ))}

          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Icon name="refresh" size={20} color="#fff" />
            <Text style={styles.resetButtonText}>Take Survey Again</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Customer Feedback Survey</Text>
          <Text style={styles.subtitle}>Your feedback helps us improve</Text>
        </View>

        {SURVEY_QUESTIONS.map((question) => renderQuestion(question))}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Icon name="check-circle" size={20} color="#fff" />
          <Text style={styles.submitButtonText}>Submit Survey</Text>
        </TouchableOpacity>
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
    padding: 16,
  },
  header: {
    marginBottom: 24,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  required: {
    color: '#ff4444',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioButtonSelected: {
    backgroundColor: '#007AFF',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 15,
    color: '#333',
  },
  switchQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  summaryHeader: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  summaryItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  summaryQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  summaryAnswer: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#ff9800',
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
