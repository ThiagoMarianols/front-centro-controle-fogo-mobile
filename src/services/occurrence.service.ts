import apiService from './api.service';
import { API_CONFIG } from '../config/api.config';
import type {
  IOccurrenceRequest,
  IOccurrenceOnSiteRequest,
  IPaginatedResponse,
  IOccurrenceDTO,
  IUpdateOccurrenceRequest,
  IOccurrenceType,
  IOccurrenceSubtype,
  IOccurrenceStatus,
  IOccurrenceNature,
} from '../types/occurrence.types';

const API_URL = `${API_CONFIG.BASE_URL}/occurrences`;

class OccurrenceService {
  async getOccurrencesPaginated(
    page: number = 1,
    size: number = 10,
    filterGeneric?: string,
    active: boolean = true
  ): Promise<{ items: IOccurrenceDTO[]; total: number }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        active: active.toString(),
      });

      if (filterGeneric) {
        params.append('filterGeneric', filterGeneric);
      }

      const response = await apiService.getApi().get<IPaginatedResponse>(
        `/occurrences/paginator?${params}`
      );

      return {
        items: response.data.items,
        total: response.data.totalItems,
      };
    } catch (error) {
      console.error('Erro ao buscar ocorrências:', error);
      throw error;
    }
  }

  async getOccurrenceById(id: number): Promise<IOccurrenceDTO> {
    try {
      const response = await apiService.getApi().get<IOccurrenceDTO>(
        `/occurrences/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar ocorrência:', error);
      throw error;
    }
  }

  async createOccurrence(data: IOccurrenceRequest): Promise<string> {
    try {
      const response = await apiService.getApi().post<string>(
        `/occurrences/register`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao criar ocorrência:', error);
      throw error;
    }
  }

  async completeOccurrence(data: any): Promise<string> {
    try {
      const response = await apiService.getApi().patch<string>(
        `/occurrences/complement`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao completar ocorrência:', error);
      throw error;
    }
  }

  async updateOccurrence(id: number, data: IUpdateOccurrenceRequest): Promise<void> {
    try {
      await apiService.getApi().put(
        `/occurrences/${id}`,
        data
      );
    } catch (error) {
      console.error('Erro ao atualizar ocorrência:', error);
      throw error;
    }
  }

  async deactivateOccurrence(id: number): Promise<void> {
    try {
      await apiService.getApi().patch(
        `/occurrences/deactivate/${id}`
      );
    } catch (error) {
      console.error('Erro ao desativar ocorrência:', error);
      throw error;
    }
  }

  async activateOccurrence(id: number): Promise<void> {
    try {
      await apiService.getApi().patch(
        `/occurrences/activate/${id}`
      );
    } catch (error) {
      console.error('Erro ao ativar ocorrência:', error);
      throw error;
    }
  }

  async getTypes(): Promise<IOccurrenceType[]> {
    try {
      const response = await apiService.getApi().get<IOccurrenceType[]>(
        `/occurrences/types`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar tipos de ocorrência:', error);
      throw error;
    }
  }

  async getTypesByNature(natureId: number): Promise<IOccurrenceType[]> {
    try {
      const response = await apiService.getApi().get<IOccurrenceType[]>(
        `/occurrences/types/${natureId}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar tipos de ocorrência:', error);
      throw error;
    }
  }

  async getSubtypes(): Promise<IOccurrenceSubtype[]> {
    try {
      const response = await apiService.getApi().get<IOccurrenceSubtype[]>(
        `/occurrences/subtypes`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar subtipos de ocorrência:', error);
      throw error;
    }
  }

  async getSubtypesByType(typeId: number): Promise<IOccurrenceSubtype[]> {
    try {
      const response = await apiService.getApi().get<IOccurrenceSubtype[]>(
        `/occurrences/subtypes/${typeId}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar subtipos de ocorrência:', error);
      throw error;
    }
  }

  async getStatus(): Promise<IOccurrenceStatus[]> {
    try {
      const response = await apiService.getApi().get<IOccurrenceStatus[]>(
        `/occurrences/status`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar status de ocorrência:', error);
      throw error;
    }
  }

  async getNatures(): Promise<IOccurrenceNature[]> {
    try {
      const response = await apiService.getApi().get<IOccurrenceNature[]>(
        `/occurrences/natures`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar naturezas de ocorrência:', error);
      throw error;
    }
  }

  async getBattalions(): Promise<{ id: number; name: string }[]> {
    try {
      const response = await apiService.getApi().get<{ id: number; name: string }[]>(
        `/battalion/all`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar batalhões:', error);
      throw error;
    }
  }
}

export default new OccurrenceService();
