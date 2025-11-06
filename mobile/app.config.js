// app.config.js

export default ({ config }) => ({
  expo: {
    name: "تشخيص سامدياجنوسيس",
    slug: "samdiagnosis-46xx8fbbj6hyx4chaj4", // ✅ مطابق لاسم المشروع في Expo
    version: "1.0.0",
    orientation: "portrait",

    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#000000"
    },

    ios: {
      bundleIdentifier: "com.samdiagnosis.app",
      supportsTablet: true
    },

    android: {
      package: "com.samdiagnosis.app",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#0a0f1a"
      }
    },

    web: {
      favicon: "./assets/icon.png"
    },

    extra: {
      eas: {
        projectId: "4f2a9d8c-01ef-4d12-967d-ef8a2873b6a0" // ✅ نفس الموجود في Expo
      },

      AI_BASE_URL: "https://samdiagnosis-ai.onrender.com",
      AI_API_KEY: "samzxzx1990"
    },

    sdkVersion: "51.0.0",

    platforms: [
      "android",
      "ios"
    ]
  }
});