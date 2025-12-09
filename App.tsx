import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { AuthProvider } from './src/contexts/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#4CAF50',
        backgroundColor: '#1a1f3a',
        borderLeftWidth: 5,
        height: 70,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
      }}
      text2Style={{
        fontSize: 14,
        color: '#999',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#FF6B6B',
        backgroundColor: '#1a1f3a',
        borderLeftWidth: 5,
        height: 70,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
      }}
      text2Style={{
        fontSize: 14,
        color: '#999',
      }}
    />
  ),
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <Toast config={toastConfig} topOffset={60} />
    </AuthProvider>
  );
}
