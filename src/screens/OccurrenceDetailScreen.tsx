import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from '../styles/OccurrenceDetail.styles';
import occurrenceService from '../services/occurrence.service';
import { IOccurrenceDTO } from '../types/occurrence.types';
import Toast from 'react-native-toast-message';

type RootStackParamList = {
  OccurrenceDetail: { id: number };
  CompleteOccurrence: { id: number };
  UpdateOccurrence: { id: number };
  OccurrenceList: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'OccurrenceDetail'>;

export const OccurrenceDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [occurrence, setOccurrence] = useState<IOccurrenceDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOccurrenceDetails();
  }, [id]);

  const fetchOccurrenceDetails = async () => {
    try {
      setLoading(true);
      const data = await occurrenceService.getOccurrenceById(id);
      setOccurrence(data);
    } catch (error) {
      console.error('Erro ao buscar detalhes da ocorrência:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível carregar os detalhes da ocorrência',
      });
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    navigation.navigate('CompleteOccurrence', { id });
  };

  const handleEdit = () => {
    navigation.navigate('UpdateOccurrence', { id });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Carregando detalhes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!occurrence) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Ocorrência não encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ocorrência #{occurrence.id}</Text>
          <Text style={styles.headerSubtitle}>
            {new Date(occurrence.createDate).toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        {/* Informações Gerais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Gerais</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{occurrence.status}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Solicitante</Text>
            <Text style={styles.infoValue}>{occurrence.occurrenceRequester}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Telefone do Solicitante</Text>
            <Text style={styles.infoValue}>
              {occurrence.occurrenceRequesterPhoneNumber}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tipo de Ocorrência</Text>
            <Text style={styles.infoValue}>{occurrence.occurrenceSubType}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tem Vítimas</Text>
            <Text style={styles.infoValue}>
              {occurrence.occurrenceHasVictims ? 'Sim' : 'Não'}
            </Text>
          </View>
        </View>

        {/* Endereço */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Rua</Text>
            <Text style={styles.infoValue}>{occurrence.street || '-'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Número</Text>
            <Text style={styles.infoValue}>{occurrence.number || '-'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Bairro</Text>
            <Text style={styles.infoValue}>{occurrence.neighborhood || '-'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Cidade</Text>
            <Text style={styles.infoValue}>{occurrence.city || '-'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>CEP</Text>
            <Text style={styles.infoValue}>{occurrence.zipCode || '-'}</Text>
          </View>

          {occurrence.complement && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Complemento</Text>
              <Text style={styles.infoValue}>{occurrence.complement}</Text>
            </View>
          )}
        </View>

        {/* Detalhes do Atendimento */}
        {occurrence.occurrenceDetails && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Detalhes do Atendimento</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Descrição</Text>
              <Text style={styles.infoValue}>{occurrence.occurrenceDetails}</Text>
            </View>

            {occurrence.latitude && occurrence.longitude && (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Latitude</Text>
                  <Text style={styles.infoValue}>{occurrence.latitude}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Longitude</Text>
                  <Text style={styles.infoValue}>{occurrence.longitude}</Text>
                </View>
              </>
            )}

            {occurrence.occurrenceArrivalTime && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Horário de Chegada</Text>
                <Text style={styles.infoValue}>
                  {new Date(occurrence.occurrenceArrivalTime).toLocaleString(
                    'pt-BR'
                  )}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Fotos */}
        {occurrence.photoUrls && occurrence.photoUrls.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fotos do Atendimento</Text>
            <View style={{ flexDirection: 'row', gap: 12, paddingVertical: 12 }}>
              {occurrence.photoUrls.map((photo, index) => (
                <View key={`photo-${index}`} style={{ borderRadius: 8, overflow: 'hidden' }}>
                  <Image
                    source={{ uri: photo }}
                    style={{ width: 120, height: 120, borderRadius: 8 }}
                  />
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Botões de Ação */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.completeButton]}
            onPress={handleComplete}
          >
            <Text style={styles.buttonText}>Completar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={handleEdit}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
