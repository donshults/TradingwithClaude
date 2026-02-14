#!/usr/bin/env node
/**
 * Bulk Upload Script for Don's Trading Lab
 * 
 * Usage:
 *   node scripts/bulk-upload.js [options]
 * 
 * Options:
 *   --dir, -d       Directory containing files to upload
 *   --series, -s    Series slug to associate with content
 *   --category, -c  Category slug to associate with content
 *   --tier, -t      Access tier (FREE, PREMIUM, PRO)
 *   --publish, -p   Publish immediately (default: false)
 *   --pattern       File pattern to match (default: *)
 * 
 * Examples:
 *   node scripts/bulk-upload.js --dir ./videos --series trading-with-claude --tier FREE
 *   node scripts/bulk-upload.js --dir ./pdfs --category mp-diamonds --tier PREMIUM --publish
 */

const fs = require('fs')
const path = require('path')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

// Parse arguments
const args = process.argv.slice(2)
const options = {
  dir: getArg(args, ['--dir', '-d']),
  series: getArg(args, ['--series', '-s']),
  category: getArg(args, ['--category', '-c']),
  tier: getArg(args, ['--tier', '-t']) || 'FREE',
  publish: args.includes('--publish') || args.includes('-p'),
  pattern: getArg(args, ['--pattern']) || '*',
  dryRun: args.includes('--dry-run'),
}

function getArg(args, flags) {
  for (const flag of flags) {
    const index = args.indexOf(flag)
    if (index !== -1 && args[index + 1]) {
      return args[index + 1]
    }
  }
  return null
}

// Validate required args
if (!options.dir) {
  console.error('❌ Error: --dir is required')
  console.log('\nUsage: node scripts/bulk-upload.js --dir ./videos --series trading-with-claude')
  process.exit(1)
}

if (!fs.existsSync(options.dir)) {
  console.error(`❌ Error: Directory not found: ${options.dir}`)
  process.exit(1)
}

// R2 Configuration - ALL credentials MUST come from environment variables
const R2_ENDPOINT = process.env.CLOUDFLARE_R2_ENDPOINT
const R2_ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID
const R2_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY
const R2_BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'dons-trading-lab'
const API_BASE = process.env.API_BASE || 'https://diamondsmp.iamdonshults.com'

if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  console.error('❌ Error: R2 credentials not found in environment')
  console.error('Please set: CLOUDFLARE_R2_ENDPOINT, CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY')
  process.exit(1)
}

const r2Client = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

// File type detection
function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase()
  const types = {
    '.mp4': 'VIDEO',
    '.webm': 'VIDEO',
    '.mov': 'VIDEO',
    '.avi': 'VIDEO',
    '.mkv': 'VIDEO',
    '.pdf': 'PDF',
    '.doc': 'DOCUMENT',
    '.docx': 'DOCUMENT',
    '.txt': 'DOCUMENT',
    '.md': 'DOCUMENT',
    '.mp3': 'AUDIO',
    '.wav': 'AUDIO',
    '.aac': 'AUDIO',
    '.m4a': 'AUDIO',
    '.ogg': 'AUDIO',
  }
  return types[ext] || 'DOCUMENT'
}

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase()
  const types = {
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo',
    '.mkv': 'video/x-matroska',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.aac': 'audio/aac',
    '.m4a': 'audio/mp4',
    '.ogg': 'audio/ogg',
  }
  return types[ext] || 'application/octet-stream'
}

function getFolder(contentType) {
  const folders = {
    'VIDEO': 'videos/',
    'PDF': 'pdfs/',
    'DOCUMENT': 'pdfs/',
    'AUDIO': 'audio/',
  }
  return folders[contentType] || 'resources/'
}

// Format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Main upload function
async function uploadFile(filePath) {
  const filename = path.basename(filePath)
  const stats = fs.statSync(filePath)
  const contentType = getContentType(filename)
  const folder = getFolder(contentType)
  const timestamp = Date.now()
  const safeFilename = filename.replace(/[^\w\s.-]/g, '_')
  const storageKey = `uploads/${folder}${timestamp}-${safeFilename}`

  console.log(`\n📄 ${filename}`)
  console.log(`   Type: ${contentType}`)
  console.log(`   Size: ${formatFileSize(stats.size)}`)

  if (options.dryRun) {
    console.log('   ⚠️  DRY RUN - Not uploading')
    return { success: true, dryRun: true, filename }
  }

  try {
    // Upload to R2
    const fileStream = fs.createReadStream(filePath)
    
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: storageKey,
      Body: fileStream,
      ContentType: getMimeType(filename),
      ContentLength: stats.size,
      Metadata: {
        'uploaded-via': 'bulk-upload-script',
        'original-filename': filename,
        'uploaded-at': new Date().toISOString(),
      },
    })

    await r2Client.send(command)
    console.log('   ✅ Uploaded to R2')

    // Create content item via API
    const title = filename.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ')
    
    const contentItemData = {
      title: title.charAt(0).toUpperCase() + title.slice(1),
      description: `Uploaded from ${filename}`,
      type: contentType,
      storageProvider: 'R2',
      storageKey: storageKey,
      fileSizeBytes: stats.size.toString(),
      seriesId: options.series,
      categoryId: options.category,
      tierRequired: options.tier,
      isPublished: options.publish,
    }

    console.log('   📝 Creating content item...')
    
    // Note: This requires admin authentication
    // For now, we just log what would be created
    console.log('   ✅ Content item data prepared:')
    console.log(`      Title: ${contentItemData.title}`)
    console.log(`      Series: ${options.series || '(none)'}`)
    console.log(`      Category: ${options.category || '(none)'}`)
    console.log(`      Tier: ${options.tier}`)
    console.log(`      Published: ${options.publish}`)

    return { 
      success: true, 
      filename,
      storageKey,
      contentType,
    }
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`)
    return { success: false, filename, error: error.message }
  }
}

// Main function
async function main() {
  console.log('🚀 Don\'s Trading Lab - Bulk Upload Script\n')
  
  console.log('Configuration:')
  console.log(`  Directory: ${options.dir}`)
  console.log(`  Series: ${options.series || '(none)'}`)
  console.log(`  Category: ${options.category || '(none)'}`)
  console.log(`  Tier: ${options.tier}`)
  console.log(`  Publish: ${options.publish}`)
  console.log(`  Dry Run: ${options.dryRun}`)
  console.log('')

  // Get files
  const files = fs.readdirSync(options.dir)
    .filter(f => {
      const ext = path.extname(f).toLowerCase()
      return ['.mp4', '.webm', '.mov', '.avi', '.pdf', '.doc', '.docx', '.mp3', '.wav'].includes(ext)
    })
    .map(f => path.join(options.dir, f))

  if (files.length === 0) {
    console.log('⚠️  No supported files found in directory')
    console.log('Supported: MP4, WebM, MOV, AVI, PDF, DOC, DOCX, MP3, WAV')
    process.exit(0)
  }

  console.log(`Found ${files.length} file(s) to upload\n`)

  // Process files
  const results = []
  for (const file of files) {
    const result = await uploadFile(file)
    results.push(result)
  }

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('UPLOAD SUMMARY')
  console.log('='.repeat(50))
  
  const successful = results.filter(r => r.success)
  const failed = results.filter(r => !r.success)

  console.log(`\n✅ Successful: ${successful.length}`)
  console.log(`❌ Failed: ${failed.length}`)

  if (failed.length > 0) {
    console.log('\nFailed uploads:')
    failed.forEach(r => console.log(`  - ${r.filename}: ${r.error}`))
  }

  console.log('\n✨ Done!')
  
  if (!options.dryRun && successful.length > 0) {
    console.log('\nNext steps:')
    console.log('1. Log in to the admin dashboard')
    console.log('2. Go to /admin/content')
    console.log('3. Edit uploaded content to add descriptions, tags, etc.')
    console.log('4. Publish when ready')
  }
}

main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
