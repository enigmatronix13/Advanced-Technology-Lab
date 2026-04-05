# Exercise 3: Theme Switcher (Light/Dark Mode)

## Overview
This exercise demonstrates theme persistence using AsyncStorage and context switching. Features include:
- **Switch component**: Toggle between light and dark themes
- **Persistent storage**: Theme preference saved to AsyncStorage
- **App-wide theming**: Colors applied to background, text, cards, and buttons
- **Restore on startup**: Saved theme is loaded when app starts

## Features Implemented
✅ Switch component to toggle dark/light mode
✅ Light theme with white backgrounds and dark text
✅ Dark theme with dark backgrounds and light text
✅ Persistent theme preference using AsyncStorage
✅ Theme auto-loads on app startup
✅ Theme object with complete color scheme
✅ Preview cards showing current theme
✅ Smooth color transitions
✅ Loading state while fetching saved preference

## How It Works
1. **Initialize**: App checks AsyncStorage for saved theme preference
2. **Load**: If exists, apply saved theme; otherwise use default (light)
3. **Toggle**: User moves switch → theme updates in state
4. **Save**: New theme preference written to AsyncStorage
5. **Persist**: Theme persists even after app restart

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

## Theme Structure
```javascript
const themes = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    cardBackground: '#f5f5f5',
    buttonBackground: '#007AFF',
    borderColor: '#e0e0e0',
  },
  dark: {
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    cardBackground: '#2a2a2a',
    buttonBackground: '#0a7ae0',
    borderColor: '#444444',
  },
};
```

## Code Highlights
- AsyncStorage: Reading and writing theme preference
- State management: `isDarkMode` state with setter
- Conditional styling: `{ backgroundColor: currentTheme.backgroundColor }`
- Switch component: `onValueChange` handler
- Theme object pattern: Centralized color management

## Customization Tips
- Add more color schemes (sepia, high-contrast)
- Implement automatic theme switching based on device settings
- Add theme animations for smoother transitions
- Create custom theme builder
- Add accent color customization
