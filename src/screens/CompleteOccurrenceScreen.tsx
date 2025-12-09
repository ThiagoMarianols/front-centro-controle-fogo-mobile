import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../styles/CompleteOccurrence.styles';
import occurrenceService from '../services/occurrence.service';
import authService from '../services/auth.service';
import Toast from 'react-native-toast-message';

type RootStackParamList = {
  CompleteOccurrence: { id: number };
  OccurrenceList: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'CompleteOccurrence'>;

interface User {
  id: number;
  normalizedName: string;
}

export const CompleteOccurrenceScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const { id } = route.params;

  const [occurrenceDetails, setOccurrenceDetails] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [tempTime, setTempTime] = useState(new Date());

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showUserPicker, setShowUserPicker] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [statuses, setStatuses] = useState<{ id: number; name: string }[]>([]);
  const [showStatusPicker, setShowStatusPicker] = useState(false);

  const [selectedBattalions, setSelectedBattalions] = useState<number[]>([]);
  const [battalions, setBattalions] = useState<{ id: number; name: string }[]>([]);
  const [showBattalionPicker, setShowBattalionPicker] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  const [photoUris, setPhotoUris] = useState<string[]>([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  useEffect(() => {
    loadData();
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (users.length > 0 && statuses.length > 0 && battalions.length > 0) {
      loadOccurrenceData();
    }
  }, [users, statuses, battalions]);

  const loadData = async () => {
    try {
      // Carregar dados em paralelo
      const [usersData, statusesData, battalionsData] = await Promise.all([
        authService.getUsers(),
        occurrenceService.getStatus(),
        occurrenceService.getBattalions(),
      ]);

      setUsers(usersData);
      setStatuses(statusesData);
      setBattalions(battalionsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível carregar os dados necessários',
      });
    }
  };

  const loadOccurrenceData = async () => {
    try {
      const occurrence = await occurrenceService.getOccurrenceById(id);
      
      // Pré-preencher campos se existirem
      if (occurrence.occurrenceDetails) {
        setOccurrenceDetails(occurrence.occurrenceDetails);
      }
      if (occurrence.latitude) {
        setLatitude(occurrence.latitude.toString());
      }
      if (occurrence.longitude) {
        setLongitude(occurrence.longitude.toString());
      }
      if (occurrence.occurrenceArrivalTime) {
        setArrivalDate(new Date(occurrence.occurrenceArrivalTime));
        setTempDate(new Date(occurrence.occurrenceArrivalTime));
        setTempTime(new Date(occurrence.occurrenceArrivalTime));
      }

      // Carregar fotos já existentes (filtrar URLs válidas)
      if (occurrence.photoUrls && occurrence.photoUrls.length > 0) {
        const validUrls = occurrence.photoUrls.filter((url: string) => {
          const isExample = url.includes('example.com');
          return !isExample;
        });
        setPhotoUris(validUrls);
      }

      // Carregar status se existir
      if (occurrence.status) {
        const statusObj = statuses.find(s => s.name === occurrence.status);
        if (statusObj) {
          setSelectedStatus(statusObj.id);
        }
      }

      // Carregar usuários/militares já selecionados
      if ((occurrence as any).users && (occurrence as any).users.length > 0) {
        const userIds = (occurrence as any).users.map((user: any) => user.id);
        setSelectedUsers(userIds);
      }

      // Carregar batalhões já selecionados
      if ((occurrence as any).battalions && (occurrence as any).battalions.length > 0) {
        const battalionNames = (occurrence as any).battalions;
        const battalionIds = battalionNames
          .map((name: string) => {
            const battalion = battalions.find(b => b.name === name);
            return battalion?.id;
          })
          .filter((id: number | undefined) => id !== undefined);
        setSelectedBattalions(battalionIds);
      }
    } catch (error) {
      console.error('Erro ao carregar dados da ocorrência:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async (): Promise<User[]> => {
    try {
      const response = await authService.getUsers();
      return response;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return [];
    }
  };

  const fetchStatuses = async (): Promise<{ id: number; name: string }[]> => {
    try {
      const response = await occurrenceService.getStatus();
      return response;
    } catch (error) {
      console.error('Erro ao buscar status:', error);
      return [];
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permissão Negada',
          text2: 'Permissão de localização necessária',
        });
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão de localização:', error);
    }
  };

  const requestMediaPermissions = async () => {
    try {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus.status !== 'granted' || mediaStatus.status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permissão Negada',
          text2: 'Permissões de câmera e galeria são necessárias',
        });
        return false;
      }
      return true;
    } catch (error) {
      console.error('Erro ao solicitar permissões de mídia:', error);
      return false;
    }
  };

  const handleGetLocation = async () => {
    try {
      setGettingLocation(true);
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLatitude(location.coords.latitude.toString());
      setLongitude(location.coords.longitude.toString());
      Toast.show({
        type: 'success',
        text1: 'Localização',
        text2: 'Coordenadas obtidas com sucesso',
      });
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível obter a localização',
      });
    } finally {
      setGettingLocation(false);
    }
  };

  const handlePickImage = async (useCamera: boolean) => {
    try {
      // Solicitar permissões
      const hasPermission = await requestMediaPermissions();
      if (!hasPermission) {
        return;
      }

      let result;
      
      if (useCamera) {
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhotoUris([...photoUris, result.assets[0].uri]);
        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Foto adicionada com sucesso',
        });
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Erro ao selecionar imagem',
      });
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotoUris(photoUris.filter((_, i) => i !== index));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    } else {
      // iOS
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
      if (selectedTime) {
        setTempTime(selectedTime);
      }
    } else {
      // iOS
      if (selectedTime) {
        setTempTime(selectedTime);
      }
    }
  };

  const confirmDate = () => {
    setArrivalDate(tempDate);
    setShowDatePicker(false);
  };

  const confirmTime = () => {
    // Manter a data atual e apenas atualizar a hora
    const currentDate = new Date(arrivalDate);
    currentDate.setHours(tempTime.getHours());
    currentDate.setMinutes(tempTime.getMinutes());
    setArrivalDate(currentDate);
    setShowTimePicker(false);
  };

  const cancelDate = () => {
    setShowDatePicker(false);
  };

  const cancelTime = () => {
    setShowTimePicker(false);
  };

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleBattalionSelection = (battalionId: number) => {
    setSelectedBattalions((prev) =>
      prev.includes(battalionId)
        ? prev.filter((id) => id !== battalionId)
        : [...prev, battalionId]
    );
  };

  const uploadPhotosToCloudinary = async (): Promise<string[]> => {
    if (photoUris.length === 0) return [];

    const uploadedUrls: string[] = [];
    
    for (const uri of photoUris) {
      try {
        const formData = new FormData();
        formData.append('file', {
          uri,
          type: 'image/jpeg',
          name: `photo_${Date.now()}.jpg`,
        } as any);
        formData.append('upload_preset', 'CCF-Senac');
        formData.append('cloud_name', 'db0uxnwoe');

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/db0uxnwoe/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error('Erro ao fazer upload da imagem');
        }

        const data = await response.json();
        uploadedUrls.push(data.secure_url);
      } catch (error) {
        console.error('Erro ao fazer upload de foto:', error);
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async () => {
    if (
      !occurrenceDetails ||
      !latitude ||
      !longitude ||
      !arrivalDate ||
      selectedUsers.length === 0 ||
      !selectedStatus ||
      selectedBattalions.length === 0
    ) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Preencha todos os campos obrigatórios',
      });
      return;
    }

    try {
      setSubmitting(true);
      
      // Valida se a data é válida
      if (isNaN(arrivalDate.getTime())) {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Data inválida.',
        });
        setSubmitting(false);
        return;
      }

      // Upload de fotos para Cloudinary
      let photoUrls: string[] = [];
      if (photoUris.length > 0) {
        setUploadingPhotos(true);
        photoUrls = await uploadPhotosToCloudinary();
        setUploadingPhotos(false);

        if (photoUrls.length === 0) {
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: 'Falha ao fazer upload das fotos',
          });
          setSubmitting(false);
          return;
        }
      }
      
      const data = {
        occurrenceDetails,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        occurrenceArrivalTime: arrivalDate.toISOString(),
        userIds: selectedUsers,
        status: selectedStatus,
        occurrenceId: id,
        vehicles: [],
        battalionIds: selectedBattalions,
        photoUrls,
      };

      await occurrenceService.completeOccurrence(data);

      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Ocorrência completada com sucesso',
      });

      navigation.navigate('OccurrenceList');
    } catch (error) {
      console.error('Erro ao completar ocorrência:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Erro ao completar ocorrência',
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
          <Text style={styles.loadingText}>Carregando formulário...</Text>
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
          <Text style={styles.headerTitle}>Completar Ocorrência</Text>
          <Text style={styles.headerSubtitle}>Ocorrência #{id}</Text>
        </View>

        {/* Seção de Atendimento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados do Atendimento</Text>

          {/* Detalhes */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Detalhes da Ocorrência
              <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textArea}
              placeholder="Descreva o que foi encontrado e as ações realizadas"
              placeholderTextColor="#666"
              value={occurrenceDetails}
              onChangeText={setOccurrenceDetails}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Data de Chegada */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Data de Chegada
              <Text style={styles.required}>*</Text>
            </Text>
            
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => {
                setTempDate(arrivalDate);
                setShowDatePicker(true);
              }}
            >
              <MaterialCommunityIcons name="calendar" size={20} color="#FF6B35" />
              <Text style={styles.dateTimeButtonText}>
                {arrivalDate.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color="#999" />
            </TouchableOpacity>
            
            <Text style={styles.helperText}>
              Toque para selecionar a data
            </Text>
          </View>

          {/* Hora de Chegada */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Hora de Chegada
              <Text style={styles.required}>*</Text>
            </Text>
            
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => {
                setTempTime(arrivalDate);
                setShowTimePicker(true);
              }}
            >
              <MaterialCommunityIcons name="clock" size={20} color="#FF6B35" />
              <Text style={styles.dateTimeButtonText}>
                {arrivalDate.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color="#999" />
            </TouchableOpacity>
            
            <Text style={styles.helperText}>
              Toque para selecionar a hora
            </Text>
          </View>

          {/* DateTimePicker para Data */}
          {showDatePicker && (
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                locale="pt-BR"
                style={Platform.OS === 'ios' ? { height: 200 } : {}}
              />
              <View style={styles.pickerButtons}>
                <TouchableOpacity
                  style={[styles.pickerButton, styles.pickerButtonCancel]}
                  onPress={cancelDate}
                >
                  <Text style={styles.pickerButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pickerButton, styles.pickerButtonConfirm]}
                  onPress={confirmDate}
                >
                  <Text style={styles.pickerButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* DateTimePicker para Hora */}
          {showTimePicker && (
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={tempTime}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleTimeChange}
                locale="pt-BR"
                is24Hour={true}
                style={Platform.OS === 'ios' ? { height: 200 } : {}}
              />
              <View style={styles.pickerButtons}>
                <TouchableOpacity
                  style={[styles.pickerButton, styles.pickerButtonCancel]}
                  onPress={cancelTime}
                >
                  <Text style={styles.pickerButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pickerButton, styles.pickerButtonConfirm]}
                  onPress={confirmTime}
                >
                  <Text style={styles.pickerButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Latitude */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Latitude
              <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex: -8.0476"
              placeholderTextColor="#666"
              value={latitude}
              onChangeText={setLatitude}
              keyboardType="decimal-pad"
            />
          </View>

          {/* Longitude */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Longitude
              <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex: -34.8770"
              placeholderTextColor="#666"
              value={longitude}
              onChangeText={setLongitude}
              keyboardType="decimal-pad"
            />
          </View>

          {/* Botão de Localização */}
          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleGetLocation}
            disabled={gettingLocation}
          >
            {gettingLocation ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <MaterialCommunityIcons name="map-marker" size={20} color="#fff" />
            )}
            <Text style={styles.locationButtonText}>
              {gettingLocation ? 'Obtendo localização...' : 'Obter Localização (GPS)'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Seção de Fotos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fotos do Atendimento</Text>

          <View style={styles.photoButtonsContainer}>
            <TouchableOpacity
              style={styles.photoButton}
              onPress={() => handlePickImage(true)}
              disabled={uploadingPhotos}
            >
              <MaterialCommunityIcons name="camera" size={24} color="#FF6B35" />
              <Text style={styles.photoButtonText}>Câmera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.photoButton}
              onPress={() => handlePickImage(false)}
              disabled={uploadingPhotos}
            >
              <MaterialCommunityIcons name="image" size={24} color="#FF6B35" />
              <Text style={styles.photoButtonText}>Galeria</Text>
            </TouchableOpacity>
          </View>

          {photoUris.length > 0 && (
            <View style={styles.photosContainer}>
              <FlatList
                data={photoUris}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item, index }) => (
                  <View key={`photo-${index}`} style={styles.photoItem}>
                    <Image
                      source={{ uri: item }}
                      style={styles.photoImage}
                    />
                    <TouchableOpacity
                      style={styles.deletePhotoButton}
                      onPress={() => handleRemovePhoto(index)}
                    >
                      <MaterialCommunityIcons
                        name="close"
                        size={20}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
        </View>

        {/* Seção de Batalhões */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Batalhões Envolvidos</Text>

          <TouchableOpacity
            style={styles.multiSelectContainer}
            onPress={() => setShowBattalionPicker(!showBattalionPicker)}
          >
            <View style={styles.selectedItemsContainer}>
              {selectedBattalions.length === 0 ? (
                <Text style={styles.dateTimeButtonPlaceholder}>
                  Selecione os batalhões...
                </Text>
              ) : (
                selectedBattalions.map((battalionId, index) => {
                  const battalion = battalions.find((b) => b.id === battalionId);
                  return (
                    <View key={`battalion-${battalionId}-${index}`} style={styles.selectedItem}>
                      <Text style={styles.selectedItemText}>
                        {battalion?.name}
                      </Text>
                    </View>
                  );
                })
              )}
            </View>
            <MaterialCommunityIcons name="chevron-down" size={20} color="#999" />
          </TouchableOpacity>

          {showBattalionPicker && (
            <View style={{ marginTop: 12 }}>
              <FlatList
                data={battalions}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: '#2a2f4a',
                      backgroundColor: selectedBattalions.includes(item.id)
                        ? '#2a2f4a'
                        : '#0A0E27',
                    }}
                    onPress={() => toggleBattalionSelection(item.id)}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text style={{ color: '#fff', fontSize: 14 }}>
                        {item.name}
                      </Text>
                      {selectedBattalions.includes(item.id) && (
                        <MaterialCommunityIcons
                          name="check"
                          size={20}
                          color="#4CAF50"
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>

        {/* Seção de Militares */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Militares Envolvidos
            <Text style={styles.required}>*</Text>
          </Text>

          <TouchableOpacity
            style={styles.multiSelectContainer}
            onPress={() => setShowUserPicker(!showUserPicker)}
          >
            {selectedUsers.length === 0 ? (
              <Text style={styles.dateTimeButtonPlaceholder}>
                Selecione os militares
              </Text>
            ) : (
              <View style={styles.selectedItemsContainer}>
                {selectedUsers.map((userId) => {
                  const user = users.find((u) => u.id === userId);
                  return (
                    <View key={userId} style={styles.selectedItem}>
                      <Text style={styles.selectedItemText}>
                        {user?.normalizedName || `ID: ${userId}`}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </TouchableOpacity>

          {showUserPicker && (
            <View style={{ marginTop: 12 }}>
              <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: '#2a2f4a',
                      backgroundColor: selectedUsers.includes(item.id)
                        ? '#2a2f4a'
                        : '#0A0E27',
                    }}
                    onPress={() => toggleUserSelection(item.id)}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text style={{ color: '#fff', fontSize: 14 }}>
                        {item.normalizedName}
                      </Text>
                      {selectedUsers.includes(item.id) && (
                        <MaterialCommunityIcons
                          name="check"
                          size={20}
                          color="#4CAF50"
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>

        {/* Seção de Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Status da Ocorrência
            <Text style={styles.required}>*</Text>
          </Text>

          <TouchableOpacity
            style={styles.multiSelectContainer}
            onPress={() => setShowStatusPicker(!showStatusPicker)}
          >
            <Text
              style={
                selectedStatus
                  ? styles.dateTimeButtonText
                  : styles.dateTimeButtonPlaceholder
              }
            >
              {selectedStatus
                ? statuses.find((s) => s.id === selectedStatus)?.name ||
                  'Selecione o status'
                : 'Selecione o status'}
            </Text>
          </TouchableOpacity>

          {showStatusPicker && (
            <View style={{ marginTop: 12 }}>
              <FlatList
                data={statuses}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: '#2a2f4a',
                      backgroundColor:
                        selectedStatus === item.id ? '#2a2f4a' : '#0A0E27',
                    }}
                    onPress={() => {
                      setSelectedStatus(item.id);
                      setShowStatusPicker(false);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text style={{ color: '#fff', fontSize: 14 }}>
                        {item.name}
                      </Text>
                      {selectedStatus === item.id && (
                        <MaterialCommunityIcons
                          name="check"
                          size={20}
                          color="#4CAF50"
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
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
            <Text style={styles.submitButtonText}>Completar Ocorrência</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
