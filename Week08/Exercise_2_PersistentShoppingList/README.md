# Exercise 2: Persistent Shopping List

## Overview
This exercise demonstrates AsyncStorage implementation for persistent data storage. Features include:
- **TextInput for adding items**: Users can type items into a text input field
- **FlatList display**: Show all items in a scrollable list
- **Delete functionality**: Each item has a delete button
- **Persistent storage**: Items are saved to AsyncStorage using JSON serialization

## Features Implemented
✅ Add items to shopping list via TextInput
✅ Display items using FlatList component
✅ Delete individual items with confirmation
✅ Clear all items functionality
✅ Persistent storage using AsyncStorage
✅ JSON serialization for data storage
✅ Item count display
✅ Timestamps for each item
✅ Empty state UI

## How It Works
1. **Add Item**: TextInput captures user input → new item object created with unique ID
2. **Store**: Full array converted to JSON string via `JSON.stringify()` and saved to AsyncStorage
3. **Load**: On app start, JSON string retrieved and parsed back to array via `JSON.parse()`
4. **Display**: FlatList renders items with delete button
5. **Delete**: Remove item from array, update state, save to AsyncStorage

## Installation & Setup
```bash
# Install dependencies (includes AsyncStorage)
npm install

# For Android
react-native run-android

# For iOS
cd ios && pod install && cd ..
react-native run-ios
```

## Dependencies
- react-native: 0.72.0
- react: 18.2.0
- @react-native-async-storage/async-storage: ^1.19.0

## Storage Structure
```javascript
// Stored as JSON string in AsyncStorage
[
  {
    id: "1234567890",
    text: "Buy groceries",
    createdAt: "3/30/2026, 10:30:45 AM"
  }
]
```

## Code Highlights
- AsyncStorage: `setItem()` and `getItem()`
- JSON serialization: `JSON.stringify()` and `JSON.parse()`
- FlatList: `renderItem()` and `keyExtractor`
- State management with hooks

## Customization Tips
- Add item categories or tags
- Implement item editing functionality
- Add swipe-to-delete gestures
- Implement search/filter functionality
- Add local database (SQLite) for more complex queries
