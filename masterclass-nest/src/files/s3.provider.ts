import { S3Client } from '@aws-sdk/client-s3';

export const S3_CLIENT = 'S3_CLIENT'; // token de injeção

export const s3Provider = {
  provide: S3_CLIENT,
  useFactory: () => {
    return new S3Client({
      endpoint: 'http://localhost:4566',  // LocalStack
      region: 'us-east-1',
      forcePathStyle: true,  // obrigatório pro LocalStack
      credentials: {
        accessKeyId: 'test',      // LocalStack aceita qualquer valor
        secretAccessKey: 'test',
      },
    });
  },
};