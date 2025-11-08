// mobile/app.config.js
export default () => ({
  expo: {
    name: "SAM-DIAGNOSIS",
    slug: "samdiagnosis-46xx8fbbj6hyx4chaj4",   // لازم يطابق Slug المعروض في Expo
    version: "1.0.0",
    orientation: "portrait",

    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#000000"
    },

    ios: {
      bundleIdentifier: "com.samdiagnosis.app",
      supportsTablet: true
    },

    android: {
      package: "com.samdiagnosis.app",
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#0a0f1a"
      }
    },

    web: { favicon: "./assets/icon.png" },

    extra: {
      AI_BASE_URL: "https://samdiagnosis-ai.onrender.com",
      AI_API_KEY: "samzxzx1990",
      eas: { projectId: "4f2a9d8c-01ef-4d12-967d-ef8a2873b6a0" } // نفس الـ Project ID الظاهر لك في Expo
    },

    sdkVersion: "~54.0.20",
    platforms: ["ios", "android"]
  }
});