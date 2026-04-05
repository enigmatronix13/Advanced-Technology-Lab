/**
 * Week 7 - React Native UI Components
 * Exercise 2: Movie Feedback Form
 *
 * Features:
 *  - TextInput for movie name
 *  - Custom radio buttons for star rating (1–5)
 *  - Switch toggle for "Would Recommend"
 *  - Submit button that stores feedback and shows summary
 *  - Input validation (cannot submit without a movie name + rating)
 *  - Feedback history display with localStorage persistence
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';

// ─── Star rating options ──────────────────────────────────────────────────────
// Each option has a numeric value and a label for clarity.
const STAR_OPTIONS = [
  { value: 1, label: "1 ⭐" },
  { value: 2, label: "2 ⭐" },
  { value: 3, label: "3 ⭐" },
  { value: 4, label: "4 ⭐" },
  { value: 5, label: "5 ⭐" },
];

// ─── Local Storage Utilities ───────────────────────────────────────────────────
const STORAGE_KEY = "movieFeedbackHistory";

const saveFeedback = (feedback) => {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const updated = [{ ...feedback, id: Date.now() }, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error("Error saving feedback:", error);
    return [];
  }
};

const loadFeedback = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (error) {
    console.error("Error loading feedback:", error);
    return [];
  }
};

const clearFeedback = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing feedback:", error);
  }
};

// Helper: convert numeric rating to a descriptive word
function getRatingText(rating) {
  switch (rating) {
    case 1: return "Terrible";
    case 2: return "Poor";
    case 3: return "Average";
    case 4: return "Good";
    case 5: return "Excellent";
    default: return "Not rated";
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────
const MovieFeedbackForm = () => {

  // Form state
  const [movieName, setMovieName]   = useState("");    // TextInput value
  const [starRating, setStarRating] = useState(null);  // Selected 1-5 (null = not chosen)
  const [recommend, setRecommend]   = useState(false); // Switch value
  const [review, setReview]         = useState("");    // Optional written review
  const [feedbackHistory, setFeedbackHistory] = useState([]); // All submitted feedback
  const [showHistory, setShowHistory] = useState(false); // Toggle between form and history

  // Load saved feedback on mount
  useEffect(() => {
    const saved = loadFeedback();
    setFeedbackHistory(saved);
  }, []);

  // ── Submission handler ──────────────────────────────────────────────────────
  const handleSubmit = () => {
    // Validate required fields before saving feedback
    if (!movieName.trim()) {
      Alert.alert("Validation Error", "Please enter the movie name.");
      return;
    }
    if (starRating === null) {
      Alert.alert("Validation Error", "Please select a star rating.");
      return;
    }

    // Create feedback object
    const newFeedback = {
      movieName,
      starRating,
      recommend,
      review,
      timestamp: new Date().toLocaleString(),
    };

    // Save and update history
    const updated = saveFeedback(newFeedback);
    setFeedbackHistory(updated);

    // Build readable summary for alert
    const summary = [
      `🎬  Movie:      ${movieName}`,
      `⭐  Rating:     ${starRating}/5 — ${getRatingText(starRating)}`,
      `👍  Recommend:  ${recommend ? "Yes" : "No"}`,
      review.trim() ? `💬  Review:     ${review}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    Alert.alert(
      "✅ Feedback Accepted!",
      summary,
      [
        {
          text: "View History",
          onPress: () => setShowHistory(true),
        },
        {
          text: "Submit Another",
          onPress: resetForm,
        },
        { text: "Close", style: "cancel" },
      ]
    );
  };

  // ── Reset all fields to default ─────────────────────────────────────────────
  const resetForm = () => {
    setMovieName("");
    setStarRating(null);
    setRecommend(false);
    setReview("");
  };

  // ── Delete single feedback ──────────────────────────────────────────────────
  const deleteFeedback = (id) => {
    Alert.alert("Delete Feedback?", "This action cannot be undone.", [
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updated = feedbackHistory.filter(item => item.id !== id);
          setFeedbackHistory(updated);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  // ── Clear all feedback ──────────────────────────────────────────────────────
  const handleClearAll = () => {
    Alert.alert(
      "Clear All Feedback?",
      "This will delete all stored feedback. This action cannot be undone.",
      [
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => {
            clearFeedback();
            setFeedbackHistory([]);
          },
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  // ─── JSX ──────────────────────────────────────────────────────────────────
  // Show history view if toggled
  if (showHistory) {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>📋 Feedback History</Text>
          <Text style={styles.subheading}>{feedbackHistory.length} submission(s)</Text>

          {feedbackHistory.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No feedback yet!</Text>
              <Text style={styles.emptySubtext}>Submit your first movie review</Text>
            </View>
          ) : (
            <FlatList
              scrollEnabled={false}
              data={feedbackHistory}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.feedbackCard}>
                  <View style={styles.feedbackHeader}>
                    <View>
                      <Text style={styles.feedbackMovie}>{item.movieName}</Text>
                      <Text style={styles.feedbackMeta}>
                        ⭐ {item.starRating}/5 • {item.recommend ? "✅" : "❌"}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => deleteFeedback(item.id)}>
                      <Text style={styles.deleteBtn}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                  {item.review && (
                    <Text style={styles.feedbackReview}>"{item.review}"</Text>
                  )}
                  <Text style={styles.feedbackTime}>{item.timestamp}</Text>
                </View>
              )}
            />
          )}

          {feedbackHistory.length > 0 && (
            <TouchableOpacity
              style={styles.clearAllButton}
              onPress={handleClearAll}
              activeOpacity={0.7}
            >
              <Text style={styles.clearAllText}>🗑️ Clear All History</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowHistory(false)}
            activeOpacity={0.85}
          >
            <Text style={styles.backText}>← Back to Form</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  // Default: Show form
  return (
    /*
      KeyboardAvoidingView shifts the UI upward when the keyboard opens,
      preventing it from covering the active TextInput.
    */
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* ── Header ── */}
        <Text style={styles.heading}>🎬 Movie Feedback</Text>
        <Text style={styles.subheading}>Share your thoughts about the movie</Text>

        {/* ── Movie Name Input ── */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Movie Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Interstellar"
            placeholderTextColor="#aaa"
            value={movieName}
            onChangeText={setMovieName}
            returnKeyType="next"
          />
        </View>

        {/* ── Star Rating (custom radio group) ── */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Your Rating *</Text>
          <View style={styles.radioGroup}>
            {STAR_OPTIONS.map((option) => {
              const isSelected = starRating === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.radioButton,
                    isSelected && styles.radioButtonSelected, // Highlight selected
                  ]}
                  onPress={() => setStarRating(option.value)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.radioText,
                      isSelected && styles.radioTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* Show rating description beneath the options */}
          {starRating !== null && (
            <Text style={styles.ratingDescription}>
              {getRatingText(starRating)}
            </Text>
          )}
        </View>

        {/* ── "Would Recommend" Switch ── */}
        <View style={styles.fieldGroup}>
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.label}>Would You Recommend?</Text>
              <Text style={styles.switchHint}>
                {recommend ? "✅ Yes, I'd recommend it!" : "❌ No, I wouldn't recommend it."}
              </Text>
            </View>
            <Switch
              value={recommend}
              onValueChange={setRecommend}
              trackColor={{ false: "#ccc", true: "#6200ee" }}
              thumbColor={recommend ? "#ffffff" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* ── Optional Written Review ── */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Your Review (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write a short review..."
            placeholderTextColor="#aaa"
            value={review}
            onChangeText={setReview}
            multiline
            numberOfLines={4}
            textAlignVertical="top" // Android: start text from top of multiline input
          />
        </View>

        {/* ── Submit Button ── */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.submitText}>Submit Feedback</Text>
        </TouchableOpacity>

        {/* ── View History Button ── */}
        {feedbackHistory.length > 0 && (
          <TouchableOpacity
            style={styles.historyButton}
            onPress={() => setShowHistory(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.historyText}>📋 View History ({feedbackHistory.length})</Text>
          </TouchableOpacity>
        )}

        {/* ── Reset Button ── */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetForm}
          activeOpacity={0.7}
        >
          <Text style={styles.resetText}>Reset Form</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1a1a2e",
    textAlign: "center",
  },
  subheading: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    marginTop: 4,
  },
  fieldGroup: {
    marginBottom: 22,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },

  // ── Radio group ──
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  radioButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  radioButtonSelected: {
    backgroundColor: "#6200ee",
    borderColor: "#6200ee",
  },
  radioText: {
    fontSize: 14,
    color: "#555",
  },
  radioTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },
  ratingDescription: {
    marginTop: 8,
    fontSize: 13,
    color: "#6200ee",
    fontStyle: "italic",
  },

  // ── Switch row ──
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
  },
  switchHint: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  // ── Buttons ──
  submitButton: {
    backgroundColor: "#6200ee",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 8,
    elevation: 3,
  },
  submitText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  resetButton: {
    borderWidth: 1.5,
    borderColor: "#6200ee",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 12,
  },
  resetText: {
    color: "#6200ee",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default MovieFeedbackForm;

/*
 * === HOW TO RUN ===
 * 1. npx create-expo-app MovieFeedback
 * 2. Replace App.js with this file.
 * 3. npx expo start
 *
 * === EXPECTED OUTPUT ===
 * - Movie name TextInput at top
 * - 5 star-rating radio buttons (highlighted purple when selected)
 * - Recommendation Switch with live hint text
 * - Optional review textarea
 * - On Submit: Alert shows full formatted summary
 * - On "Submit Another": form resets completely
 * - Validation: Alert if movie name or rating is missing
 */
