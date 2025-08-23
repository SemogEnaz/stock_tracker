// r2.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const frontendURL = process.env.FRONTEND_ORIGIN;

// Basic CORS if your web app is on another origin
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", frontendURL || "*");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Multer: keep file in memory (simple) and limit size to something sane
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 1, fileSize: 20 * 1024 * 1024 } // 20MB
});

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,              // e.g. https://<accountid>.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  }
});

const BUCKET = process.env.R2_BUCKET;

// Tiny whitelist for keys so nobody can inject weird paths;
// you can relax this as needed.
function sanitizeKey(s) {
  // allow slashes for directories (e.g. 0x00015/front.jpg)
  if (typeof s !== "string") return "";
  const cleaned = s.replace(/[^a-zA-Z0-9._/-]+/g, "-").replace(/-{2,}/g, "-");
  // prevent leading slash or parent dirs
  if (cleaned.startsWith("/") || cleaned.includes("..")) return "";
  return cleaned;
}

// POST /r2/upload
// Form fields:
//   - file: <the image file>
//   - key (optional): object key to use, e.g. "0x00015/front.jpg"
//     If not provided, we’ll fall back to "<timestamp>-<originalname>"
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "file_required" });

    // If the frontend sends a key, use it (sanitized). Otherwise default.
    const requestedKey = sanitizeKey(req.body.key || "");
    const fallbackName = `${Date.now()}-${(req.file.originalname || "upload").replace(/\s+/g, "_")}`;
    const Key = requestedKey || fallbackName;

    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype || "application/octet-stream",
      // Remove CacheControl if these shouldn’t be cached
      CacheControl: "public, max-age=31536000, immutable"
    }));

    return res.json({
      ok: true,
      key: Key,
      bucket: BUCKET,
      bytes: req.file.size,
      mime: req.file.mimetype
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "upload_failed", details: err.message });
  }
});

module.exports = router;
