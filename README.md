# Pick of the week

Pick of the week (POTW) is a web app that facilitates a recurring music based social event. The app allows users to submit songs to a playlist, and then vote on the songs that have been submitted. The song with the most votes at the end of the week is declared the pick of the week.

The scoring and competitive aspect os optional, and the app can be used as a simple way to share music with friends.

## Getting Started

### Prerequisites

- Node.js version 20.0.0 or higher
- npm version 7.0.0 or higher
- PostgreSQL version 16.0 or higher running on localhost, port 5432
- Access to the GCP project that hosts the Firebase Realtime Database

Decode the secrets by running the following command:

```bash
./scripts/decode-secrets.sh -e=local
```

Then, install the dependencies:

```bash
npm install
```

First, run the development server:

```bash
npm run dev
```
