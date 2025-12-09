import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from '../styles/CompleteOccurrence.styles';
import occurrenceService from '../services/occurrence.service';
import { IOccurrenceDTO } from '../types/occurrence.types';
import Toast from 'react-native-toast-message';
import { formatPhone, formatZipCode, removeFormatting } from '../utils/format';

type RootStackParamList = {
  UpdateOccurrence: { id: number };
  OccurrenceList: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'UpdateOccurrence'>;

export const UpdateOccurrenceScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const { id } = route.params;

  const [occurrence, setOccurrence] = useState<IOccurrenceDTO | null>(null);
  const [requester, setRequester] = useState('');
  const [requesterPhone, setRequesterPhone] = useState('');
  const [details, setDetails] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [complement, setComplement] = useState('');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchOccurrence();
  }, [id]);

  const fetchOccurrence = async () => {
    try {
      setLoading(true);
      const data = await occurrenceService.getOccurrenceById(id);
      setOccurrence(data);
      setRequester(data.occurrenceRequester);
      setRequesterPhone(data.occurrenceRequesterPhoneNumber);
      setDetails(data.occurrenceDetails || '');
      
      // Carregar endereço - pode vir como objeto ou campos separados
      if (data.address) {
        setStreet(data.address.street || '');
        setNumber(data.address.number?.toString() || '');
        setNeighborhood(data.address.neighborhood || '');
        setCity(data.address.city || '');
        setZipCode(data.address.zipCode || '');
        setComplement(data.address.complement || '');
      } else {
        setStreet(data.street || '');
        setNumber(data.number || '');
        setNeighborhood(data.neighborhood || '');
        setCity(data.city || '');
        setZipCode(data.zipCode || '');
        setComplement(data.complement || '');
      }
    } catch (error) {
      console.error('Erro ao buscar ocorrência:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível carregar a ocorrência',
      });
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!requester || !requesterPhone || !street || !number || !neighborhood || !city || !zipCode) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Preencha todos os campos obrigatórios',
      });
      return;
    }

    try {
      setSubmitting(true);
      
      const data: any = {
        occurrenceHasVictims: occurrence?.occurrenceHasVictims || false,
        occurrenceRequester: requester,
        occurrenceRequesterPhoneNumber: removeFormatting(requesterPhone),
        occurrenceSubType: 1,
        address: {
          zipCode: removeFormatting(zipCode),
          street,
          number: parseInt(number),
          neighborhood,
          city,
          state: 'SP',
          complement,
        },
        occurrenceDetails: details,
        latitude: occurrence?.latitude,
        longitude: occurrence?.longitude,
        userIds: [],
        vehicles: [],
        status: 1,
        battalionIds: [],
      };
      
      // Adicionar occurrenceArrivalTime apenas se existir
      if (occurrence?.occurrenceArrivalTime) {
        data.occurrenceArrivalTime = occurrence.occurrenceArrivalTime;
      }

      await occurrenceService.updateOccurrence(id, data);

      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Ocorrência atualizada com sucesso',
      });

      navigation.navigate('OccurrenceList');
    } catch (error) {
      console.error('Erro ao atualizar ocorrência:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Erro ao atualizar ocorrência',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Carregando ocorrência...</Text>
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
          <Text style={styles.headerTitle}>Atualizar Ocorrência</Text>
          <Text style={styles.headerSubtitle}>Ocorrência #{id}</Text>
        </View>

        {/* Seção de Solicitante */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do Solicitante</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Nome do Solicitante
              <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nome completo"
              placeholderTextColor="#666"
              value={requester}
              onChangeText={setRequester}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Telefone
              <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="(11) 99999-9999"
              placeholderTextColor="#666"
              value={requesterPhone}
              onChangeText={(text) => setRequesterPhone(formatPhone(text))}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Seção de Endereço */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Rua
              <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nome da rua"
              placeholderTextColor="#666"
              value={street}
              onChangeText={setStreet}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Número
              <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="123"
              placeholderTextColor="#666"
              value={number}
              onChangeText={setNumber}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Bairro
              <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nome do bairro"
              placeholderTextColor="#666"
              value={neighborhood}
              onChangeText={setNeighborhood}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Cidade
              <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nome da cidade"
              placeholderTextColor="#666"
              value={city}
              onChangeText={setCity}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              CEP
              <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="12345-678"
              placeholderTextColor="#666"
              value={zipCode}
              onChangeText={(text) => setZipCode(formatZipCode(text))}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Complemento</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Apto, sala, etc."
              placeholderTextColor="#666"
              value={complement}
              onChangeText={setComplement}
            />
          </View>
        </View>

        {/* Seção de Detalhes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Descrição da Ocorrência</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Descreva os detalhes da ocorrência"
              placeholderTextColor="#666"
              value={details}
              onChangeText={setDetails}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Botão de Envio */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            submitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Atualizar Ocorrência</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
