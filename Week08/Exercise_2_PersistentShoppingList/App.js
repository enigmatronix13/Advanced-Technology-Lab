import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@shopping_list';

export default function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Load items from AsyncStorage when app starts
  useEffect(() => {
    loadItems();
  }, []);

  // Load items from AsyncStorage
  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedItems !== null) {
        // Parse the JSON string back to array
        const parsedItems = JSON.parse(storedItems);
        setItems(parsedItems);
      }
    } catch (error) {
      console.error('Error loading items:', error);
      Alert.alert('Error', 'Failed to load items');
    }
  };

  // Save items to AsyncStorage
  const saveItems = async (itemsToSave) => {
    try {
      // Convert array to JSON string and store
      const jsonString = JSON.stringify(itemsToSave);
      await AsyncStorage.setItem(STORAGE_KEY, jsonString);
    } catch (error) {
      console.error('Error saving items:', error);
      Alert.alert('Error', 'Failed to save items');
    }
  };

  // Add new item
  const addItem = () => {
    if (inputValue.trim() === '') {
      Alert.alert('Error', 'Please enter an item');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      createdAt: new Date().toLocaleString(),
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    saveItems(updatedItems);
    setInputValue('');
  };

  // Delete item
  const deleteItem = (id) => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          const updatedItems = items.filter((item) => item.id !== id);
          setItems(updatedItems);
          saveItems(updatedItems);
        },
        style: 'destructive',
      },
    ]);
  };

  // Clear all items
  const clearAll = () => {
    Alert.alert('Clear All', 'Are you sure you want to delete all items?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Clear',
        onPress: () => {
          setItems([]);
          saveItems([]);
        },
        style: 'destructive',
      },
    ]);
  };

  // Render list item
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{item.text}</Text>
        <Text style={styles.itemTime}>{item.createdAt}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(item.id)}
      >
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping List</Text>
        {items.length > 0 && (
          <Text style={styles.itemCount}>{items.length} items</Text>
        )}
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.textInput}
          placeholder="Add a new item..."
          placeholderTextColor="#999"
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={addItem}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🛒</Text>
          <Text style={styles.emptyMessage}>Your shopping list is empty</Text>
          <Text style={styles.emptySubtext}>Add items to get started</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {items.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#e8f4f8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  inputSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 5,
  },
  itemTime: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    width: 36,
    height: 36,
    backgroundColor: '#ff4444',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  deleteButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 15,
  },
  emptyMessage: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  clearButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    height: 50,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
