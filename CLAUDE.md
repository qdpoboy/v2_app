# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **React Native mobile application** built with **Expo** and **Expo Router** for V2EX community. The app uses file-based routing with TypeScript.

## Commands

```bash
# Start development server
npm start

# Run on specific platforms
npm run ios      # iOS simulator
npm run android  # Android emulator/device
npm run web      # Web browser
```

## Architecture

### File-Based Routing
The app uses **Expo Router** with file-based routing in the `app/` directory:
- `app/_layout.tsx` - Root layout with Stack navigation
- `app/(tabs)/` - Tab navigation group containing main screens
- `app/topic/[id].tsx` - Dynamic route for topic detail pages

### Navigation Setup
- Root uses `Stack` navigator from `expo-router` with slide-from-right animation on Android
- Tabs layout defines two tabs:  首页 (Home) and 我的 (My)

### TypeScript Configuration
- Extends `expo/tsconfig.base`
- Path alias: `@/*` maps to `src/*` (configure `src` directory if needed)

### Styling Pattern
React Native `StyleSheet.create()` for component styling.

## Tech Stack

- **Framework:** Expo SDK ~54.0
- **Navigation:** expo-router ~6.0
- **React:** 19.1.0
- **React Native:** 0.81.5
- **Language:** TypeScript

## Recommended Additions

This is a newly initialized project. Consider adding:
- Jest + React Native Testing Library for testing
- ESLint + Prettier for code quality
- A README.md with setup instructions