// app.config.js
export default ({ config }) => ({
  expo: {
    name: "SAM-DIAGNOSIS",
    slug: "samdiagnosis",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,

    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#000000"
    },

    ios: {
      bundleIdentifier: "com.samdiagnosis.app",
      buildNumber: "1"
    },

    android: {
      package: "com.samdiagnosis.app",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#0a0f1a"
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false
    },

    web: {
      favicon: "./assets/icon.png"
    },

    extra: {
      eas: {
        projectId: process.env.EXPO_PROJECT_ID
      },
      AI_BASE_URL: process.env.AI_BASE_URL,
      AI_API_KEY: process.env.AI_API_KEY
    }
  }
});
