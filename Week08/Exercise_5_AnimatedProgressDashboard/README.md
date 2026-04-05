# Additional Exercise: Animated Progress Dashboard

This folder contains a standalone React Native app for the advanced exercise.

## What it does
- Loads progress from AsyncStorage on startup
- Animates the progress bar from 0% to the stored value
- Provides a `Sync` button that waits 2 seconds before updating local storage
- Replays the bar animation after every sync

## Files
- [App.js](App.js)
- [package.json](package.json)
- [metro.config.js](metro.config.js)

## Run it
```bash
npm install
npm run android
```

For iOS:
```bash
cd ios
pod install
cd ..
npm run ios
```

## Notes
- The sync action simulates a network request with `setTimeout`.
- Stored progress is persisted under a single AsyncStorage key.