import { Inject, Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3_CLIENT } from './s3.provider';

const BUCKET = 'user-files';

@Injectable()
export class FilesService{
    constructor(
        @Inject(S3_CLIENT) private readonly s3: S3Client,
    ) {}

    async upload(userId: number, filename: string, buffer: Buffer, mimetype: string){
        const key = `${userId}/${filename}`;
        
        await this.s3.send(
            new PutObjectCommand({
                Bucket: BUCKET,
                Key: key,
                Body: buffer,
                ContentType: mimetype,
            }),
        );
        
        return { key, message: 'upload realizado com sucesso'};
    }

    async list(userId: number){
        const response = await this.s3.send(
            new ListObjectsV2Command({
                Bucket: BUCKET,
                Prefix: `${userId}/`,
            }),
        );
        return response.Contents ?? [];
    }

    async getDownloadUrl(key: string): Promise<string> {
        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
        });
        return getSignedUrl(this.s3, command, { expiresIn: 3600 }); 
    }

}