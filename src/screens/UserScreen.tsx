import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { styles } from '../styles/HomeScreen.styles';
import authService from '../services/auth.service';
import { User } from '../types/auth.types';
import { formatPhone, formatCPF } from '../utils/format';

export const HomeScreen: React.FC = () => {
  const { user, signOut } = useAuth();
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
        Alert.alert('Atenção', 'Não foi possível carregar os dados do usuário.');
        setUserData(user);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      Alert.alert('Erro', 'Erro ao carregar informações do usuário.');
      setUserData(user);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <MaterialCommunityIcons name="fire-truck" size={48} color="#FF6B35" />
          <Text style={styles.welcomeText}>Bem-vindo(a)!</Text>
          <Text style={styles.userName}>{userData?.normalizedName || userData?.username}</Text>
          {userData?.patent && (
            <Text style={styles.userSubtitle}>{userData.patent.name}</Text>
          )}
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B35" />
            <Text style={styles.loadingText}>Carregando dados...</Text>
          </View>
        ) : (
          <>
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>Informações Pessoais</Text>
              <InfoItem icon="account" label="Usuário" value={userData?.username || '-'} />
              <InfoItem icon="email" label="Email" value={userData?.email || '-'} />
              <InfoItem icon="phone" label="Telefone" value={formatPhone(userData?.phoneNumber || '')} />
              <InfoItem icon="card-account-details" label="CPF" value={formatCPF(userData?.cpf || '')} />
              <InfoItem icon="badge-account" label="Matrícula" value={userData?.matriculates || '-'} />
              <InfoItem 
                icon="gender-male-female" 
                label="Gênero" 
                value={userData?.gender === 'M' ? 'Masculino' : userData?.gender === 'F' ? 'Feminino' : '-'} 
              />
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>Dados Funcionais</Text>
              <InfoItem 
                icon="shield-star" 
                label="Patente" 
                value={userData?.patent?.name || '-'} 
              />
              <InfoItem 
                icon="office-building" 
                label="Batalhão" 
                value={userData?.battalion?.name || '-'} 
              />
              <InfoItem 
                icon="shield-account" 
                label="Permissão" 
                value={userData?.userRoles?.[0]?.role?.name || '-'} 
              />
              <InfoItem 
                icon="check-circle" 
                label="Status" 
                value={userData?.active ? 'Ativo' : 'Inativo'} 
              />
            </View>
          </>
        )}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={signOut}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

interface InfoItemProps {
  icon: string;
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <View style={styles.infoItem}>
    <View style={styles.infoLabelContainer}>
      <MaterialCommunityIcons name={icon as any} size={18} color="#FF6B35" />
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);
