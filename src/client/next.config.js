require('dotenv').config();

module.exports = {
  distDir: '../../dist/client',
  env: {
    environment: process.env.NODE_ENV,

    // Firebase Config
    firebaseApiKey: process.env.FB_API_KEY,
    firebaseAuthDomain: process.env.FB_AUTH_DOMAIN,
    firebaseDatabaseURL: process.env.FB_DATABASE_URL,
    firebaseProjectId: process.env.FB_PROJECT_ID,
    firebaseStorageBucket: process.env.FB_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FB_APP_ID
  }
};