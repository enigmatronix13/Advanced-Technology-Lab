import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CATEGORIES = [
  { id: '1', name: 'Food', icon: 'food' },
  { id: '2', name: 'Travel', icon: 'airplane' },
  { id: '3', name: 'Sports', icon: 'basketball' },
  { id: '4', name: 'Music', icon: 'music' },
  { id: '5', name: 'Gaming', icon: 'gamepad-variant' },
  { id: '6', name: 'Technology', icon: 'laptop' },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCardPress = (category) => {
    setSelectedCategory(category.id);
    Alert.alert(
      'Category Selected',
      `You selected: ${category.name}`,
      [{ text: 'OK' }]
    );
  };

  const CategoryCard = ({ item }) => {
    const isSelected = selectedCategory === item.id;
    return (
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && styles.cardSelected,
        ]}
        onPress={() => handleCardPress(item)}
        activeOpacity={0.7}
      >
        <Icon
          name={item.icon}
          size={40}
          color={isSelected ? '#fff' : '#007AFF'}
          style={styles.icon}
        />
        <Text style={[
          styles.cardText,
          isSelected && styles.cardTextSelected,
        ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
      </View>
      <FlatList
        data={CATEGORIES}
        renderItem={({ item }) => <CategoryCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 8,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardSelected: {
    backgroundColor: '#007AFF',
  },
  icon: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  cardTextSelected: {
    color: '#fff',
  },
});
