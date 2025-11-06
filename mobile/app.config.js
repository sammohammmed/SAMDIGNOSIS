// mobile/app.config.js
export default {
  expo: {
    name: "SAM-DIAGNOSIS",
    slug: "samdiagnosis",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: { image: "./assets/splash.png", resizeMode: "contain", backgroundColor: "#000000" },

    ios: { bundleIdentifier: "com.samdiagnosis.app", supportsTablet: true },
    android: {
      package: "com.samdiagnosis.app",
      versionCode: 1,
      adaptiveIcon: { foregroundImage: "./assets/icon.png", backgroundColor: "#0a0f1a" }
    },

    web: { favicon: "./assets/icon.png" },

    extra: {
      eas: { projectId: "ضع-الـ-UUID-الذي-نسخته-من-Expo" },   // ← مهم جدًا
      AI_BASE_URL: "https://samdiagnosis-ai.onrender.com",
      AI_API_KEY: "samzxzx1990"
    },

    // (اختياري) لو تبغى تتجنب تحقق iOS مؤقتًا:
    platforms: ["android"]
  }
};