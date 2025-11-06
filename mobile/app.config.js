// app.config.js
export default ({ config }) => ({
  expo: {
    name: "SAM-DIAGNOSIS",
    slug: "samdiagnosis",
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
      // Expo EAS project (اختياري: إن كان عندك ID جاهز ضعه هنا)
      // eas: { projectId: "ضع-الـUUID-إن-عندك" },

      AI_BASE_URL: "https://samdiagnosis-ai.onrender.com",
      AI_API_KEY: "samzxzx1990"
    }
  }
});