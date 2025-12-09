import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

class StorageService {
  private isValidKey(key: string): boolean {
    if (!key || key.trim() === '') {
      return false;
    }
    const validKeyRegex = /^[a-zA-Z0-9._-]+$/;
    return validKeyRegex.test(key);
  }

  async setSecureItem(key: string, value: string): Promise<void> {
    try {
      if (!this.isValidKey(key)) {
        throw new Error(`Invalid key: "${key}". Keys must contain only alphanumeric characters, ".", "-", and "_"`);
      }

      if (Platform.OS === 'web') {
        await AsyncStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.error('Error saving secure item:', error);
      throw error;
    }
  }

  async getSecureItem(key: string): Promise<string | null> {
    try {
      if (!this.isValidKey(key)) {
        console.warn(`Invalid key: "${key}". Returning null.`);
        return null;
      }

      if (Platform.OS === 'web') {
        return await AsyncStorage.getItem(key);
      } else {
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.error('Error getting secure item:', error);
      return null;
    }
  }

  async removeSecureItem(key: string): Promise<void> {
    try {
      if (!this.isValidKey(key)) {
        console.warn(`Invalid key: "${key}". Skipping removal.`);
        return;
      }

      if (Platform.OS === 'web') {
        await AsyncStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error('Error removing secure item:', error);
      throw error;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving item:', error);
      throw error;
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Error getting item:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }
}

export default new StorageService();
