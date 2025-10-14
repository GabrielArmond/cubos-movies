import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  jwt: {
    secret: string;
  };
  googleCloud: {
    projectId: string;
    keyFilename?: string; // Para arquivo JSON
    clientEmail?: string; // Para private key
    privateKey?: string; // Para private key
    bucketName: string;
  };
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || '',
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-key',
  },
  googleCloud: {
    projectId: process.env.GCLOUD_PROJECT_ID || '',
    keyFilename: process.env.GCLOUD_KEY_FILE
      ? path.resolve(process.env.GCLOUD_KEY_FILE)
      : undefined,
    clientEmail: !process.env.GCLOUD_KEY_FILE
      ? process.env.GCLOUD_CLIENT_EMAIL
      : undefined,
    privateKey: !process.env.GCLOUD_KEY_FILE
      ? process.env.GCLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n')
      : undefined,
    bucketName: process.env.GCLOUD_BUCKET_NAME || '',
  },
};

export default config;
