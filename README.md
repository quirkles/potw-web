# Pick of the Week

Pick of the Week (POTW) is a web app that facilitates a recurring music-based social event. The app allows users to submit songs to a playlist and vote on the songs that have been submitted. The song with the most votes at the end of the week is declared the "Pick of the Week."

The scoring and competitive aspect is optional, and the app can be used as a simple way to share music with friends.

## Features

- **Song Submission**: Users can submit songs to be included in weekly playlists
- **Voting System**: Vote on submitted songs to determine the weekly winner
- **User Authentication**: Secure login via Google OAuth
- **Playlist Management**: Easily browse and manage song submissions
- **Real-time Updates**: Powered by Firebase for instant updates

## Tech Stack

- **Frontend**: React 18, Next.js 15.2.4
- **State Management**: Redux (via @reduxjs/toolkit)
- **Styling**: Styled Components
- **Authentication**: Firebase Authentication, Google OAuth
- **Database**: Firebase Firestore for realtime updates, Backed by a Postgres
- **Testing**: Jest, React Testing Library
- **Component Development**: Storybook

## Getting Started

### Prerequisites

- Node.js version 20.0.0 or higher
- npm version 7.0.0 or higher
- PostgreSQL version 16.0 or higher running on localhost, port 5432
- Access to the GCP project that hosts the Firebase Realtime Database

### Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd potw-web
   ```

2. **Decode the secrets by running**
   ```bash
   ./scripts/decode-secrets.sh -e=local
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint with automatic fixes
- `npm run storybook` - Start Storybook for component development
- `npm run test` - Run Jest tests

## Firebase Setup

GCP project ID: [quirkles-potw](https://console.cloud.google.com/welcome?invt=Abuaqw&project=quirkles-potw)

Managed by: [Alex Quirk](mailto:alex@quirkles.com). Contact for access

