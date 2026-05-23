// =========================================================
// lib/minio.ts
// Complete MinIO S3 utility for Next.js
// =========================================================

// awdIwdhJef352fewb

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// =========================================================
// ENV VARIABLES REQUIRED
// =========================================================

/*
.env.local

S3_ENDPOINT=https://minio.guntassandhu.com
S3_ACCESS_KEY=mentoruser
S3_SECRET_KEY=strongpassword123
S3_BUCKET=mentor-plus
S3_REGION=us-east-1
*/

// =========================================================
// S3 CLIENT
// =========================================================

export const s3 = new S3Client({
  region: process.env.S3_REGION || "us-east-1",

  endpoint: process.env.S3_ENDPOINT,

  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },

  forcePathStyle: true,
});

export const BUCKET = process.env.S3_BUCKET || "";

// =========================================================
// TYPES
// =========================================================

export interface UploadFileParams {
  file: File | Buffer;
  fileName: string;
  contentType?: string;
}

// =========================================================
// UPLOAD FILE
// =========================================================

export async function uploadFile({
  file,
  fileName,
  contentType,
}: UploadFileParams) {
  let body: Buffer;

  if (Buffer.isBuffer(file)) {
    body = file;
  } else {
    body = Buffer.from(await file.arrayBuffer());
  }

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: fileName,
    Body: body,
    ContentType: contentType,
  });

  await s3.send(command);

  return {
    success: true,
    fileName,
    url: `${process.env.S3_ENDPOINT}/${BUCKET}/${fileName}`,
  };
}

// =========================================================
// LIST FILES
// =========================================================

export async function listFiles(prefix?: string) {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET,
    Prefix: prefix,
  });

  const response = await s3.send(command);

  return (
    response.Contents?.map((item) => ({
      key: item.Key,
      size: item.Size,
      lastModified: item.LastModified,
      etag: item.ETag,
    })) || []
  );
}

// =========================================================
// GET FILE METADATA
// =========================================================

export async function getFileInfo(fileName: string) {
  const command = new HeadObjectCommand({
    Bucket: BUCKET,
    Key: fileName,
  });

  const response = await s3.send(command);

  return {
    contentType: response.ContentType,
    size: response.ContentLength,
    lastModified: response.LastModified,
    etag: response.ETag,
  };
}

// =========================================================
// DELETE FILE
// =========================================================

export async function deleteFile(fileName: string) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: fileName,
  });

  await s3.send(command);

  return {
    success: true,
    deleted: fileName,
  };
}

// =========================================================
// GET FILE STREAM
// Useful for downloads / proxying files
// =========================================================

export async function getFile(fileName: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: fileName,
  });

  return await s3.send(command);
}

// =========================================================
// GENERATE PUBLIC DOWNLOAD URL
// Requires bucket/object to be publicly accessible
// =========================================================

export function getPublicFileUrl(fileName: string) {
  return `${process.env.S3_ENDPOINT}/${BUCKET}/${fileName}`;
}

// =========================================================
// GENERATE TEMPORARY SIGNED URL
// =========================================================

export async function getSignedFileUrl(fileName: string, expiresIn = 60 * 60) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: fileName,
  });

  return await getSignedUrl(s3, command, {
    expiresIn,
  });
}

// =========================================================
// CHECK IF FILE EXISTS
// =========================================================

export async function fileExists(fileName: string) {
  try {
    await getFileInfo(fileName);
    return true;
  } catch {
    return false;
  }
}

// =========================================================
// EXAMPLE USAGE
// =========================================================

/*

import {
  uploadFile,
  listFiles,
  deleteFile,
  getSignedFileUrl,
} from "@/lib/minio";


// Upload
await uploadFile({
  file,
  fileName: "avatar.png",
  contentType: "image/png",
});


// List
const files = await listFiles();


// Delete
await deleteFile("avatar.png");


// Signed URL
const url = await getSignedFileUrl("avatar.png");

console.log(url);

*/
