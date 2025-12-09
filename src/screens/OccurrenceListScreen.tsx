import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
  RefreshControl,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from '../styles/OccurrenceList.styles';
import occurrenceService from '../services/occurrence.service';
import { IOccurrenceDTO } from '../types/occurrence.types';
import Toast from 'react-native-toast-message';

type RootStackParamList = {
  OccurrenceList: undefined;
  OccurrenceDetail: { id: number };
  CompleteOccurrence: { id: number };
  UpdateOccurrence: { id: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'OccurrenceList'>;

export const OccurrenceListScreen: React.FC<Props> = ({ navigation }) => {
  const [occurrences, setOccurrences] = useState<IOccurrenceDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterActive, setFilterActive] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'waiting'>('pending');

  const fetchOccurrences = useCallback(async () => {
    try {
      setLoading(true);
      const response = await occurrenceService.getOccurrencesPaginated(
        1,
        100,
        undefined,
        filterActive
      );
      setOccurrences(response.items);
    } catch (error) {
      console.error('Erro ao buscar ocorrências:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível carregar as ocorrências',
      });
    } finally {
      setLoading(false);
    }
  }, [filterActive]);

  useEffect(() => {
    fetchOccurrences();
  }, [fetchOccurrences]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchOccurrences();
    setRefreshing(false);
  }, [fetchOccurrences]);

  const handleViewDetails = (id: number) => {
    navigation.navigate('OccurrenceDetail', { id });
  };

  const handleComplete = (id: number) => {
    navigation.navigate('CompleteOccurrence', { id });
  };

  const handleEdit = (id: number) => {
    navigation.navigate('UpdateOccurrence', { id });
  };

  // Filtrar e ordenar ocorrências
  const filteredAndSortedOccurrences = useMemo(() => {
    let filtered = occurrences.filter((occurrence) => {
      // Filtro por status
      if (filterStatus !== 'all') {
        const statusLower = occurrence.status?.toLowerCase() || '';
        if (filterStatus === 'pending' && !statusLower.includes('atendimento')) {
          return false;
        }
        if (filterStatus === 'waiting' && !statusLower.includes('aguardando')) {
          return false;
        }
      }

      // Filtro por busca
      if (searchText.trim()) {
        const search = searchText.toLowerCase();
        return (
          occurrence.occurrenceRequester?.toLowerCase().includes(search) ||
          occurrence.occurrenceRequesterPhoneNumber?.includes(search) ||
          occurrence.id.toString().includes(search)
        );
      }

      return true;
    });

    // Ordenar por data de criação (mais recentes primeiro)
    filtered.sort((a, b) => {
      const dateA = new Date(a.createDate).getTime();
      const dateB = new Date(b.createDate).getTime();
      return dateB - dateA;
    });

    return filtered;
  }, [occurrences, searchText, filterStatus]);

  const renderOccurrenceCard = ({ item }: { item: IOccurrenceDTO }) => (
    <View style={styles.occurrenceCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardId}>#{item.id}</Text>
        <View style={styles.cardStatus}>
          <Text style={styles.cardStatusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Solicitante</Text>
        <Text style={styles.cardValue}>{item.occurrenceRequester}</Text>
      </View>

      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Telefone</Text>
        <Text style={styles.cardValue}>{item.occurrenceRequesterPhoneNumber}</Text>
      </View>

      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Tipo</Text>
        <Text style={styles.cardValue}>{item.occurrenceSubType}</Text>
      </View>

      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Data</Text>
        <Text style={styles.cardValue}>
          {new Date(item.createDate).toLocaleDateString('pt-BR')}
        </Text>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => handleViewDetails(item.id)}
        >
          <Text style={styles.actionButtonText}>Visualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.completeButton]}
          onPress={() => handleComplete(item.id)}
        >
          <Text style={styles.actionButtonText}>Completar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEdit(item.id)}
        >
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Carregando ocorrências...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ocorrências</Text>
          <Text style={styles.headerSubtitle}>
            {filteredAndSortedOccurrences.length} ocorrência(s)
          </Text>
        </View>

        {/* Campo de Busca */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome, telefone ou ID..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <MaterialCommunityIcons name="close" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filtro de Status */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterStatus === 'pending' && styles.filterButtonActive,
            ]}
            onPress={() => setFilterStatus('pending')}
          >
            <Text style={styles.filterButtonText}>Em Atendimento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              filterStatus === 'waiting' && styles.filterButtonActive,
            ]}
            onPress={() => setFilterStatus('waiting')}
          >
            <Text style={styles.filterButtonText}>Aguardando</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              filterStatus === 'all' && styles.filterButtonActive,
            ]}
            onPress={() => setFilterStatus('all')}
          >
            <Text style={styles.filterButtonText}>Todas</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Ocorrências */}
        {filteredAndSortedOccurrences.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={48}
              color="#999"
            />
            <Text style={styles.emptyText}>Nenhuma ocorrência encontrada</Text>
          </View>
        ) : (
          <FlatList
            data={filteredAndSortedOccurrences}
            renderItem={renderOccurrenceCard}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#FF6B35"
              />
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
