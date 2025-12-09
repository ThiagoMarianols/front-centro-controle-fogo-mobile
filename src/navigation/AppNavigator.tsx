import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { SimpleHomeScreen } from '../screens/SimpleHomeScreen';
import { HomeScreen } from '../screens/UserScreen';
import { OccurrenceListScreen } from '../screens/OccurrenceListScreen';
import { OccurrenceDetailScreen } from '../screens/OccurrenceDetailScreen';
import { CompleteOccurrenceScreen } from '../screens/CompleteOccurrenceScreen';
import { UpdateOccurrenceScreen } from '../screens/UpdateOccurrenceScreen';
import { RootStackParamList } from './types';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const OccurrenceStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="OccurrenceList" component={OccurrenceListScreen} />
      <Stack.Screen name="OccurrenceDetail" component={OccurrenceDetailScreen} />
      <Stack.Screen name="CompleteOccurrence" component={CompleteOccurrenceScreen} />
      <Stack.Screen name="UpdateOccurrence" component={UpdateOccurrenceScreen} />
    </Stack.Navigator>
  );
};

const HomeTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="SimpleHome" component={SimpleHomeScreen} />
    </Stack.Navigator>
  );
};

const ProfileTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Profile" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#1a1f3a',
          borderTopColor: '#2a2f4a',
          borderTopWidth: 1,
          paddingBottom: 12,
          paddingTop: 8,
          height: 70,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen
        name="OccurrencesTab"
        component={OccurrenceStack}
        options={{
          tabBarLabel: 'Ocorrências',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialCommunityIcons name="file-document-multiple" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {user ? (
          <Stack.Screen name="Home" component={BottomTabNavigator} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0E27',
  },
});
