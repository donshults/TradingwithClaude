/**
 * Content Upload Scripts for Cloudflare R2
 * 
 * Usage:
 *   npx tsx scripts/upload-content.ts <file-path> <workshop-id> <content-type>
 * 
 * Examples:
 *   npx tsx scripts/upload-content.ts ./trading-with-claude.mp4 trading-with-claude video
 *   npx tsx scripts/upload-content.ts ./strategy-guide.pdf trading-with-claude pdf
 */

import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { createReadStream } from 'fs'
import { stat } from 'fs/promises'
import path from 'path'

// R2 Configuration - ALL credentials MUST come from environment variables
const R2_ENDPOINT = process.env.CLOUDFLARE_R2_ENDPOINT
const R2_ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID
const R2_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY
const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'dons-trading-lab'

if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  throw new Error('Missing required R2 credentials. Please set: CLOUDFLARE_R2_ENDPOINT, CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY')
}

const r2Client = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

type ContentType = 'video' | 'pdf' | 'document'

interface UploadOptions {
  filePath: string
  workshopId: string
  contentType: ContentType
  customKey?: string
  makePublic?: boolean
}

function getContentType(mimeType: string): string {
  const types: Record<string, string> = {
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  }
  return types[mimeType.toLowerCase()] || 'application/octet-stream'
}

function getFolderForType(type: ContentType): string {
  switch (type) {
    case 'video':
      return 'videos'
    case 'pdf':
    case 'document':
      return 'pdfs'
    default:
      return 'resources'
  }
}

export async function uploadContent(options: UploadOptions): Promise<{ key: string; url: string }> {
  const { filePath, workshopId, contentType, customKey } = options
  
  const filename = path.basename(filePath)
  const ext = path.extname(filename)
  const folder = getFolderForType(contentType)
  const key = customKey || `workshops/${workshopId}/${folder}/${filename}`
  
  const fileStats = await stat(filePath)
  const fileStream = createReadStream(filePath)
  
  console.log(`Uploading ${filename}...`)
  console.log(`  Size: ${(fileStats.size / 1024 / 1024).toFixed(2)} MB`)
  console.log(`  Key: ${key}`)
  
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    Body: fileStream,
    ContentType: getContentType(ext),
    ContentLength: fileStats.size,
    Metadata: {
      'workshop-id': workshopId,
      'content-type': contentType,
      'original-filename': filename,
      'uploaded-at': new Date().toISOString(),
    },
  })
  
  await r2Client.send(command)
  
  // Return the public URL pattern (will be served through API)
  const publicUrl = `/api/content/${workshopId}/${contentType}/${encodeURIComponent(filename)}`
  
  console.log(`✅ Upload complete!`)
  console.log(`  Public URL: ${publicUrl}`)
  
  return { key, url: publicUrl }
}

export async function checkFileExists(key: string): Promise<boolean> {
  try {
    await r2Client.send(new HeadObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    }))
    return true
  } catch {
    return false
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2)
  
  if (args.length < 3) {
    console.log('Usage: npx tsx scripts/upload-content.ts <file-path> <workshop-id> <content-type>')
    console.log('')
    console.log('Examples:')
    console.log('  npx tsx scripts/upload-content.ts ./video.mp4 trading-with-claude video')
    console.log('  npx tsx scripts/upload-content.ts ./guide.pdf trading-with-claude pdf')
    console.log('')
    console.log('Content types: video, pdf, document')
    process.exit(1)
  }
  
  const [filePath, workshopId, type] = args
  
  if (!['video', 'pdf', 'document'].includes(type)) {
    console.error(`Invalid content type: ${type}. Must be one of: video, pdf, document`)
    process.exit(1)
  }
  
  uploadContent({
    filePath,
    workshopId,
    contentType: type as ContentType,
  })
    .then(result => {
      console.log('\nUpload successful!')
      console.log(JSON.stringify(result, null, 2))
      process.exit(0)
    })
    .catch(error => {
      console.error('Upload failed:', error)
      process.exit(1)
    })
}
