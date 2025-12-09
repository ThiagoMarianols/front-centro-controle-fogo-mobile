import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import authService from '../services/auth.service';
import { User } from '../types/auth.types';

type RootStackParamList = {
  SimpleHome: undefined;
  OccurrenceList: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'SimpleHome'>;

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export const SimpleHomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User | null>(user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUserData(currentUser);
      } else {
        setUserData(user);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      setUserData(user);
    } finally {
      setLoading(false);
    }
  };

  const features: Feature[] = [
    {
      icon: 'fire-truck',
      title: 'Listar Ocorrências',
      description: 'Visualize todas as ocorrências em tempo real',
      color: '#B13433',
    },
    {
      icon: 'plus-circle',
      title: 'Completar Ocorrência',
      description: 'Registre dados e fotos do atendimento',
      color: '#228be6',
    },
    {
      icon: 'pencil',
      title: 'Editar Ocorrência',
      description: 'Atualize informações da ocorrência',
      color: '#40c057',
    },
    {
      icon: 'map-marker',
      title: 'Localização',
      description: 'Capture coordenadas GPS do local',
      color: '#fd7e14',
    },
  ];

  return (
    <SafeAreaView style={homeStyles.container}>
      <StatusBar style="light" />
      <ScrollView
        style={homeStyles.scrollView}
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={homeStyles.heroSection}>
          <View style={homeStyles.heroContent}>
            <MaterialCommunityIcons name="fire-truck" size={64} color="#FF6B35" />
            <Text style={homeStyles.welcomeText}>Bem-vindo(a)!</Text>
            <Text style={homeStyles.userName}>{userData?.normalizedName || userData?.username}</Text>
            {userData?.patent && (
              <Text style={homeStyles.userSubtitle}>{userData.patent.name}</Text>
            )}
          </View>
        </View>

        {loading ? (
          <View style={homeStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B35" />
            <Text style={homeStyles.loadingText}>Carregando dados...</Text>
          </View>
        ) : (
          <>
            {/* Features Section */}
            <View style={homeStyles.featuresSection}>
              <View style={homeStyles.sectionHeader}>
                <Text style={homeStyles.sectionTitle}>Funcionalidades do Sistema</Text>
                <Text style={homeStyles.sectionSubtitle}>Acesse rapidamente as principais áreas</Text>
              </View>

              <View style={homeStyles.featuresGrid}>
                {features.map((feature, index) => (
                  <TouchableOpacity
                    key={index}
                    style={homeStyles.featureCard}
                    onPress={() => navigation.navigate('OccurrenceList')}
                  >
                    <View style={[homeStyles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                      <MaterialCommunityIcons
                        name={feature.icon as any}
                        size={32}
                        color={feature.color}
                      />
                    </View>
                    <Text style={homeStyles.featureTitle}>{feature.title}</Text>
                    <Text style={homeStyles.featureDescription}>{feature.description}</Text>
                    <TouchableOpacity
                      style={[homeStyles.featureButton, { backgroundColor: `${feature.color}20` }]}
                    >
                      <Text style={[homeStyles.featureButtonText, { color: feature.color }]}>
                        Acessar
                      </Text>
                      <MaterialCommunityIcons
                        name="chevron-right"
                        size={16}
                        color={feature.color}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Emergency Section */}
            <View style={homeStyles.emergencySection}>
              <View style={homeStyles.emergencyContent}>
                <View style={homeStyles.emergencyIcon}>
                  <MaterialCommunityIcons name="alert" size={32} color="#fff" />
                </View>
                <View style={homeStyles.emergencyText}>
                  <Text style={homeStyles.emergencyTitle}>Precisando de ajuda?</Text>
                  <Text style={homeStyles.emergencyDescription}>
                    Entre em contato conosco pelo nosso e-mail para que possamos ajudá-lo.
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={homeStyles.emergencyButton}>
                <MaterialCommunityIcons name="phone" size={20} color="#B13433" />
                <Text style={homeStyles.emergencyButtonText}>suporte@ccf.com.br</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    backgroundColor: '#1a1f3a',
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2f4a',
  },
  heroContent: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  userSubtitle: {
    fontSize: 14,
    color: '#FF6B35',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: '#999',
    fontSize: 16,
    marginTop: 16,
  },
  featuresSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#1a1f3a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2f4a',
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
    lineHeight: 16,
  },
  featureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  featureButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emergencySection: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: 'linear-gradient(135deg, #B13433 0%, #8B0000 100%)',
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden',
  },
  emergencyContent: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  emergencyIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyText: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  emergencyDescription: {
    fontSize: 13,
    color: '#fff',
    lineHeight: 18,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  emergencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B13433',
  },
});
