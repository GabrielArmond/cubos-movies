import { Request, Response, NextFunction } from 'express';
import { googleCloudStorage } from '../services/googleCloudStorage';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        message: 'Nenhum arquivo foi enviado',
      });
      return;
    }

    const fileExtension = req.file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const folder = 'movies';

    const destination = `${folder}/${fileName}`;
    const publicUrl = await googleCloudStorage.uploadFile(
      req.file,
      destination,
    );

    res.status(200).json({
      message: 'Upload realizado com sucesso',
      url: publicUrl,
      fileName: destination,
    });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
};

export const deleteImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { fileName } = req.params;

    if (!fileName) {
      res.status(400).json({
        message: 'Nome do arquivo não informado',
      });
      return;
    }

    const exists = await googleCloudStorage.fileExists(fileName);

    if (!exists) {
      res.status(404).json({
        message: 'Arquivo não encontrado',
      });
      return;
    }

    await googleCloudStorage.deleteFile(fileName);

    res.status(200).json({
      message: 'Arquivo deletado com sucesso',
    });
  } catch (error) {
    console.error('Erro ao deletar arquivo:', error);
    res.status(500).json({
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
};
