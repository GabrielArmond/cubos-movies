import { Storage } from '@google-cloud/storage';
import config from '../config/config';

class GoogleCloudStorageService {
  private storage: Storage;
  private bucketName: string;

  constructor() {
    const storageOptions: any = {
      projectId: config.googleCloud.projectId,
    };

    if (config.googleCloud.keyFilename) {
      storageOptions.keyFilename = config.googleCloud.keyFilename;
    } else if (
      config.googleCloud.clientEmail &&
      config.googleCloud.privateKey
    ) {
      storageOptions.credentials = {
        client_email: config.googleCloud.clientEmail,
        private_key: config.googleCloud.privateKey,
      };
    }

    this.storage = new Storage(storageOptions);
    this.bucketName = config.googleCloud.bucketName;
  }

  async uploadFile(
    file: Express.Multer.File,
    destination: string,
  ): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(destination);

    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
        console.error('Erro no upload:', error);
        reject(new Error('Erro ao fazer upload do arquivo'));
      });

      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${destination}`;
        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    });
  }

  async deleteFile(fileName: string): Promise<void> {
    const bucket = this.storage.bucket(this.bucketName);
    await bucket.file(fileName).delete();
  }

  async fileExists(fileName: string): Promise<boolean> {
    const bucket = this.storage.bucket(this.bucketName);
    const [exists] = await bucket.file(fileName).exists();
    return exists;
  }

  async getSignedUrl(
    fileName: string,
    expiresIn = 15 * 60 * 1000,
  ): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const file = bucket.file(fileName);

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + expiresIn,
    });

    return url;
  }
}

export const googleCloudStorage = new GoogleCloudStorageService();
