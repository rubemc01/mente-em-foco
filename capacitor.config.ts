import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rubem.menteemfoco',
  appName: 'Mente em Foco',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    GoogleSignIn: {
      clientId: '346431881707-4u2hb0ehk2pnum0reameokvdokf2iltn.apps.googleusercontent.com',
    },
  },
};

export default config;