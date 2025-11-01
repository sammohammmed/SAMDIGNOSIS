# SAMDIAGNOSIS – Smart AI Medical Diagnostic Platform

SAMDIAGNOSIS is an end-to-end prototype for an AI-assisted medical diagnostics platform covering web, mobile, and backend services. The solution demonstrates secure patient management, exam uploads, AI result presentation, and clinical decision-support disclaimers.

## Project Structure

```
workspace/
├─ web/          # React + Vite frontend with Tailwind CSS
├─ backend/      # Express + TypeScript mock API
├─ mobile/       # Expo React Native mobile app
└─ README.md     # You are here
```

## Features

- **Web Dashboard**: Upload medical imaging or lab files, view AI-generated insights, and track patient history in an elegant clinician-friendly UI.
- **Backend API**: Mock REST endpoints for authentication, patient management, exam records, and AI inference simulation.
- **Mobile App**: Expo-powered companion app with dashboard analytics, patient lists, and the ability to trigger AI analysis on-the-go.
- **Consistent Theming**: Unified medical-grade palette (teal/blue) across platforms and reusable component libraries.
- **Safety Messaging**: Built-in clinical disclaimer reminding users that AI results require human validation.

## Prerequisites

- Node.js 18+
- npm 9+ or compatible package manager
- (Optional) Android Studio / Xcode for native builds
- Expo CLI (`npm install -g expo-cli`) if you plan to run the mobile app locally

## Backend API

```bash
cd backend
cp .env.example .env   # adjust PORT / ALLOW_ORIGIN if needed
npm install
npm run dev            # starts on http://localhost:4000

# Production build
npm run build
npm start
```

Key endpoints (base path `/api`):

- `POST /auth/login` – mock login (see `src/data/mockDb.ts` for seeded credentials)
- `GET /patients` – patient summaries
- `GET /patients/:id` – patient profile with exam history
- `POST /patients/:id/exams` – add a new exam to a patient
- `POST /exams/:id/analyze` – simulate AI inference for an exam
- `POST /ai/analyze` – ad-hoc AI analysis mock endpoint

## Web Frontend

```bash
cd web
npm install
npm run dev            # http://localhost:5173 by default

# Lint & build
npm run lint
npm run build
```

The frontend is preconfigured with Tailwind CSS, lucide-react icons, and rich cards for upload, AI results, and patient history visualization.

## Mobile App (Expo)

```bash
cd mobile
cp .env.example .env            # set EXPO_PUBLIC_API_URL (e.g. http://localhost:4000/api)
npm install
expo start                     # choose Android/iOS/Web emulator or QR code

# Type check
npm run typecheck               # runs `tsc --noEmit`
```

### Building an Android APK

Due to environment constraints, an APK cannot be generated and attached directly here. Follow these steps on your own machine or CI:

1. Install Android Studio + SDK (or use a cloud CI service).
2. Ensure the backend API is accessible (configure `EXPO_PUBLIC_API_URL`).
3. From `mobile/`, run one of the following:
   - **Debug APK**: `expo run:android --variant release` (requires Expo SDK 49+ and local Android toolchain)
   - **EAS Build (Recommended)**:
     ```bash
     npm install -g eas-cli
     eas login
     eas build -p android --profile production
     ```
     Download the generated APK/AAB from the EAS dashboard.

4. Distribute the APK to testers once you verify AI disclaimer visibility and API connectivity.

### iOS Build Notes

Use `eas build -p ios` or `expo run:ios` on macOS. Ensure Apple developer certificates are configured.

## Testing the End-to-End Flow

1. Start the backend (`npm run dev` in `backend/`).
2. Launch the web app (`npm run dev` in `web/`).
3. Run the mobile app (`expo start` in `mobile/`).
4. Use the seeded user in `src/data/mockDb.ts` (`sara.almutairi@samdiagnosis.ai / Password123!`).
5. Upload mock files, trigger AI analysis, and confirm history persistence across UI surfaces.

## Clinical & Security Considerations

- The current AI outputs are mock data; no real inference is performed.
- All patient data is stored in-memory for demonstration (no persistence).
- Production deployments should integrate with HIPAA/GDPR-compliant storage and authentication (e.g., Firebase Auth + Firestore, Google Cloud Storage).
- Maintain patient consent logs before sharing diagnostics.

## Next Steps

- Swap mock AI endpoints with real ML models (e.g., Vertex AI, custom TensorFlow Serving).
- Integrate secure file storage (GCS, S3) and signed URLs.
- Add role-based access control and audit logging.
- Extend mobile app with offline caching and push notifications for exam updates.

---

*Developed as a multi-platform reference implementation for SAMDIAGNOSIS. Remember: AI recommendations are advisory and must be validated by licensed clinicians before clinical use.*
