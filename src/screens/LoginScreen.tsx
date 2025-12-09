import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, validatePassword, getErrorMessage } from '../utils/validation';
import { FirefighterIllustration } from '../components/FirefighterIllustration';
import { styles } from '../styles/LoginScreen.styles';

const CREDENTIALS_KEY = 'saved_credentials';

export const LoginScreen: React.FC = () => {
  const { signIn, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });

  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const savedCredentials = await SecureStore.getItemAsync(CREDENTIALS_KEY);
      if (savedCredentials) {
        const { email: savedEmail, password: savedPassword } = JSON.parse(savedCredentials);
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.log('Erro ao carregar credenciais salvas:', error);
    }
  };

  const saveCredentials = async () => {
    try {
      await SecureStore.setItemAsync(
        CREDENTIALS_KEY,
        JSON.stringify({ email, password })
      );
    } catch (error) {
      console.log('Erro ao salvar credenciais:', error);
    }
  };

  const clearSavedCredentials = async () => {
    try {
      await SecureStore.deleteItemAsync(CREDENTIALS_KEY);
    } catch (error) {
      console.log('Erro ao limpar credenciais:', error);
    }
  };

  const validateForm = (): boolean => {
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    const newErrors = {
      email: emailValidation.message,
      password: passwordValidation.message,
    };

    setErrors(newErrors);
    setTouched({ email: true, password: true });

    return emailValidation.isValid && passwordValidation.isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      Toast.show({
        type: 'error',
        text1: 'Campos inválidos',
        text2: 'Preencha todos os campos corretamente',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    try {
      await signIn({ email, password });
      
      if (rememberMe) {
        await saveCredentials();
      } else {
        await clearSavedCredentials();
      }
      
      Toast.show({
        type: 'success',
        text1: 'Login realizado!',
        text2: 'Bem-vindo ao sistema',
        position: 'top',
        visibilityTime: 2000,
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      
      if (errorMessage.toLowerCase().includes('senha') || 
          errorMessage.toLowerCase().includes('incorret') ||
          errorMessage.toLowerCase().includes('inválid') ||
          errorMessage.toLowerCase().includes('não encontrado')) {
        setErrors({
          email: 'E-mail ou senha incorretos',
          password: 'Verifique suas credenciais',
        });
        
        Toast.show({
          type: 'error',
          text1: 'Credenciais inválidas',
          text2: 'E-mail ou senha incorretos',
          position: 'top',
          visibilityTime: 4000,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro no login',
          text2: errorMessage,
          position: 'top',
          visibilityTime: 4000,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroSection}>
            <View style={styles.overlay} />
            <View style={styles.heroContent}>
              <FirefighterIllustration />
              <View style={styles.titleContainer}>
                <Text style={styles.heroTitle}>CORPO DE</Text>
                <Text style={styles.heroTitleBold}>BOMBEIROS</Text>
                <View style={styles.divider} />
                <Text style={styles.heroSubtitle}>Central de Controle de Fogo</Text>
              </View>
            </View>
          </View>

          <View style={styles.loginCard}>
            <Text style={styles.welcomeText}>Bem-vindo(a)</Text>
            <Text style={styles.instructionText}>Entre com suas credenciais</Text>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                  <MaterialCommunityIcons name="email-outline" size={18} color="#FF6B35" />
                  <Text style={styles.label}>
                    E-mail <Text style={styles.required}>*</Text>
                  </Text>
                </View>
                <View style={[
                  styles.inputWrapper, 
                  errors.email && touched.email && styles.inputWrapperError
                ]}>
                  <MaterialCommunityIcons 
                    name="email" 
                    size={20} 
                    color="#666" 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={(text: string) => {
                      setEmail(text);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    onBlur={() => setTouched({ ...touched, email: true })}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    autoComplete="off"
                    textContentType="none"
                    editable={!loading}
                  />
                </View>
                {errors.email && touched.email ? (
                  <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle" size={14} color="#FF6B6B" />
                    <Text style={styles.errorText}>{errors.email}</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.labelContainer}>
                  <MaterialCommunityIcons name="lock-outline" size={18} color="#FF6B35" />
                  <Text style={styles.label}>
                    Senha <Text style={styles.required}>*</Text>
                  </Text>
                </View>
                <View style={[
                  styles.inputWrapper, 
                  errors.password && touched.password && styles.inputWrapperError
                ]}>
                  <MaterialCommunityIcons 
                    name="lock" 
                    size={20} 
                    color="#666" 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={(text: string) => {
                      setPassword(text);
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    onBlur={() => setTouched({ ...touched, password: true })}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="off"
                    textContentType="none"
                    editable={!loading}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    <Ionicons 
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
                      size={22} 
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && touched.password ? (
                  <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle" size={14} color="#FF6B6B" />
                    <Text style={styles.errorText}>{errors.password}</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.rememberMeContainer}>
                <TouchableOpacity
                  style={styles.checkboxWrapper}
                  onPress={() => setRememberMe(!rememberMe)}
                  disabled={loading}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && (
                      <MaterialCommunityIcons name="check" size={16} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.rememberMeText}>Lembrar minhas credenciais</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#fff" size="small" />
                    <Text style={styles.loginButtonText}>Entrando...</Text>
                  </View>
                ) : (
                  <View style={styles.loadingContainer}>
                    <MaterialCommunityIcons name="login" size={20} color="#fff" />
                    <Text style={styles.loginButtonText}>ACESSAR SISTEMA</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Sistema de Gestão de Ocorrências
              </Text>
              <Text style={styles.footerVersion}>v1.0.0 • SENAC</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
