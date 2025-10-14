import api from '../api';

interface UploadResponse {
  message: string;
  url: string;
  fileName: string;
}

export const uploadApi = {
  uploadImage: async (
    file: File,
    movieId: string,
    imageType: 'poster' | 'backdrop'
  ): Promise<string> => {
    if (!file || !movieId || !imageType) {
      throw new Error('Parâmetros obrigatórios não fornecidos');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('movieId', movieId);
    formData.append('imageType', imageType);

    try {
      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response || !response.data.url) {
        throw new Error('Resposta inválida do servidor');
      }

      const result: UploadResponse = response.data;
      return result.url;
    } catch (error) {
      throw new Error(
        `Erro ao fazer upload da imagem: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  },

  deleteImage: async (fileName: string): Promise<void> => {
    const response = await api.delete(`/upload/${fileName}`);

    if (!response || !response.data) {
      throw new Error('Erro ao deletar imagem');
    }
  },
};
