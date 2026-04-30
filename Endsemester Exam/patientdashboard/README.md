# Patient Dashboard Application

## Executive Summary

The Patient Dashboard is a cross-platform mobile and web application developed using React Native and Expo, designed to facilitate patient-doctor appointment management and patient profile creation within a healthcare information system. The application implements a modular architecture with two primary functional modules: patient profile creation with comprehensive form validation and appointment booking with physician selection capabilities.

## Technical Overview

### Architecture and Technology Stack

**Framework & Runtime Environment:**
- **Expo**: A managed React Native platform providing abstraction over native platform complexities
- **React Native**: Cross-platform framework enabling code reuse across iOS, Android, and web platforms
- **React 19.1.0**: Core reactive programming library for UI component composition
- **TypeScript 5.9.2**: Statically-typed superset of JavaScript ensuring type safety and enhanced developer experience

**UI Component Libraries:**
- `react-native-gesture-handler`: Advanced gesture recognition and handling for native-like touch interactions
- `react-native-reanimated`: Performance-optimized animation library leveraging native threads
- `@react-native-picker/picker`: Native picker component implementation for platform-specific selection interfaces
- `expo-router`: File-based routing system enabling intuitive navigation patterns

**Development Infrastructure:**
- ESLint 9.25.0 with Expo configuration for code quality assurance
- React Native Web 0.21.0 for browser-based rendering of React Native components

### Application Structure

```
patientdashboard/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx              # Primary landing page with module navigation
│   │   ├── _layout.tsx            # Tab-based navigation layout
│   │   ├── dashboard/
│   │   │   ├── CreateProfile.tsx  # Patient profile creation module
│   │   │   └── ChooseDoctor.tsx   # Appointment booking module
│   │   ├── explore.tsx            # Supplementary navigation page
│   │   └── _layout.tsx            # Sub-router configuration
│   ├── _layout.tsx                # Application root router configuration
│   └── modal.tsx                  # Modal overlay implementation
├── components/                    # Reusable UI component library
├── constants/                     # Application-wide constants and theme definitions
├── hooks/                         # Custom React hooks for shared logic
└── scripts/                       # Utility scripts for project maintenance
```

## Functional Specification

### Module 1: Patient Profile Creation

#### Purpose
Enables patient registration and profile establishment within the system through structured data collection and validation.

#### Implementation Details

**File Location:** `app/(tabs)/dashboard/CreateProfile.tsx`

**Data Model:**
```typescript
interface PatientProfile {
  name: string;           // Full name (required, non-empty string)
  phone: string;          // Telephone number (required, exactly 10 digits)
  age: number;            // Age in years (required, non-negative integer)
}
```

**Validation Rules:**
1. **Name Validation**: Non-empty string validation ensuring at least one character is provided
2. **Phone Number Validation**: Regular expression pattern matching `^\d{10}$` ensuring exactly 10 numeric digits
3. **Age Validation**: 
   - Numeric type validation ensuring input is convertible to integer
   - Non-negative constraint validation (age ≥ 0)
   - NaN rejection ensuring valid numeric conversion

**User Interface Components:**
- Descriptive page header with visual hierarchy
- Three TextInput fields with semantic keyboard types:
  - Standard keyboard for name input
  - Numeric keyboard for phone input (enforced with `maxLength={10}`)
  - Numeric keyboard for age input
- Styled success notification display upon successful submission
- Form submission button with visual feedback

**State Management:**
- Form state variables: `name`, `phone`, `age`
- Success state: `submitted` (boolean flag)
- Submitted data persistence: `submittedData` (temporary storage for display)

**Interaction Flow:**
1. User enters personal information in respective fields
2. User activates submit button
3. Validation pipeline executes sequentially
4. Upon validation failure: Alert dialog displays specific error message
5. Upon validation success:
   - Success notification displays with submitted information
   - Automatic form reset occurs after 3-second delay
   - State resets for subsequent entries

### Module 2: Appointment Booking

#### Purpose
Facilitates appointment scheduling through physician selection and temporal slot allocation.

#### Implementation Details

**File Location:** `app/(tabs)/dashboard/ChooseDoctor.tsx`

**Data Model:**
```typescript
interface AppointmentBooking {
  doctor: string;    // Selected physician identifier
  timing: string;    // Selected appointment time slot
}
```

**Available Options:**

Physician Pool:
- Dr. Smith
- Dr. Johnson
- Dr. Lee
- Dr. Patel

Available Time Slots:
- 09:00 AM
- 11:00 AM
- 01:00 PM
- 03:00 PM

**User Interface Components:**
- Descriptive page header with semantic typography
- Native picker component for physician selection with disabled text rendering
- Native picker component for appointment time selection with disabled text rendering
- Form submission button with visual confirmation

**State Management:**
- Selected physician: `selectedDoctor` (default: first element of physicians array)
- Selected timing: `selectedTiming` (default: first element of timings array)
- Submission state: `submitted` (boolean flag)
- Booking confirmation: `submittedData` (temporary storage for display)

**Interaction Flow:**
1. User selects preferred physician from dropdown picker
2. User selects preferred appointment time from dropdown picker
3. User activates booking submission button
4. System displays success notification with selected values
5. Notification automatically dismisses after 3-second interval

### Landing Page

**File Location:** `app/(tabs)/index.tsx`

**Purpose:** Central navigation hub providing access to both functional modules

**Features:**
- Clean card-based layout with visual separation
- Semantic module descriptions
- Direct navigation links to both patient profile and appointment booking modules
- Professional typography hierarchy and color scheme

## Visual Design Specification

### Color Palette

| Element | Color Code | Purpose |
|---------|-----------|---------|
| Primary Action | #1a73e8 | Call-to-action buttons, headings |
| Background | #f8f9fa | Page/container backgrounds |
| Card Background | #ffffff | Modal/form container backgrounds |
| Success Indicator | #28a745 | Positive validation feedback |
| Success Background | #d4edda | Success notification background |
| Text Primary | #333333 | Primary text content |
| Text Secondary | #666666 | Secondary/descriptive text |
| Border | #dddddd | Input field borders |
| Field Background | #fafafa | Input field backgrounds |

### Typography

- **Title**: 28-32pt, Bold, Primary Color (#1a73e8)
- **Subtitle**: 16pt, Regular, Secondary Color (#666)
- **Labels**: 14pt, Semi-bold, Primary Text (#333)
- **Body Text**: 14pt, Regular, Primary Text (#333)
- **Button Text**: 16pt, Semi-bold, White (#fff)

### Layout Specifications

- Container padding: 20pt
- Card border radius: 8pt
- Input field border radius: 6pt
- Button padding: 14pt vertical, consistent horizontal
- Inter-element spacing: 12-24pt

## Installation and Execution

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Expo CLI (for development)

### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Web Platform Execution**
   ```bash
   npm run web
   ```

3. **Alternative Platforms**
   ```bash
   npm run android    # Android emulator
   npm run ios        # iOS simulator
   npm run start      # Universal development mode
   ```

## Form Validation Logic Flow

### CreateProfile Validation Pipeline

```
User Input Submission
         ↓
   [Name Validation]
   Check: !name.trim() === ""
   ├─ FAIL → Alert & Return
   └─ PASS ↓
   
   [Phone Validation]
   Check: !/^\d{10}$/.test(phone)
   ├─ FAIL → Alert & Return
   └─ PASS ↓
   
   [Age Validation]
   Check: !age || isNaN(age) || age < 0
   ├─ FAIL → Alert & Return
   └─ PASS ↓
   
   [Success Handler]
   ├─ Display Success Notification
   ├─ Store Submitted Data
   ├─ Auto-reset after 3 seconds
   └─ Clear Form State
```

## Success Message Display

Upon successful form submission, the application implements a 3-second success notification display containing:
- Checkmark indicator (✓)
- Confirmation message ("Successfully Created/Booked")
- Submitted data summary with relevant field values
- Automatic dismissal with form/state reset

## Development Considerations

### Code Organization
- Modular component structure enabling independent testing
- Separation of concerns between UI presentation and business logic
- Reusable styling patterns through StyleSheet API

### Performance Optimizations
- Native picker components reduce rendering overhead
- React hooks for efficient state management
- ScrollView implementation preventing layout overflow

### Cross-Platform Compatibility
- Responsive design accommodating various screen sizes
- Platform-agnostic component usage ensuring web compatibility
- Consistent visual design across all platforms

## Testing Scenarios

### CreateProfile Module
1. Test empty name submission → Validation error
2. Test phone number with < 10 digits → Validation error
3. Test phone number with alphabetic characters → Validation error
4. Test negative age value → Validation error
5. Test valid complete form → Success notification
6. Test form reset after submission

### ChooseDoctor Module
1. Test physician selection → Value change verification
2. Test timing selection → Value change verification
3. Test booking submission → Success notification
4. Test multiple successive bookings → State reset verification

## Conclusion

The Patient Dashboard application provides a robust, user-friendly interface for fundamental healthcare appointment management operations. Through comprehensive form validation, intuitive navigation, and modern UI design principles, the application ensures reliable patient data collection and appointment scheduling with appropriate feedback mechanisms.

---

**Application Version:** 1.0.0  
**Last Updated:** April 2026  
**Platform Support:** iOS, Android, Web (via React Native Web)
