import { S3Client } from '@aws-sdk/client-s3'

// Cloudflare R2 is S3-compatible - ALL values MUST come from environment variables
const R2_ENDPOINT = process.env.CLOUDFLARE_R2_ENDPOINT
const R2_ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID
const R2_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY
const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'dons-trading-lab'

if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  throw new Error('Missing required R2 credentials. Check your environment variables: CLOUDFLARE_R2_ENDPOINT, CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY')
}

// Create S3-compatible client for Cloudflare R2
export const r2Client = new S3Client({
  region: 'auto', // R2 uses 'auto' for region
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

export const R2_BUCKET = R2_BUCKET_NAME

// Content folder structure in R2
export const R2_FOLDERS = {
  VIDEOS: 'videos/',
  PDFS: 'pdfs/',
  WORKSHOPS: 'workshops/',
  RESOURCES: 'resources/',
} as const

export type ContentType = 'video' | 'pdf' | 'document'

export function getContentKey(type: ContentType, workshopId: string, filename: string): string {
  const folder = type === 'video' ? R2_FOLDERS.VIDEOS : R2_FOLDERS.PDFS
  return `${R2_FOLDERS.WORKSHOPS}${workshopId}/${folder}${filename}`
}
