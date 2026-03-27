import { cors } from '../_cors.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;

  // Vercel serverless does not support multer file uploads directly.
  // Images should be uploaded to an external service (e.g., Supabase Storage, Cloudinary)
  // or saved as base64 in the database.
  // For now, return a placeholder response.
  if (req.method === 'POST') {
    return res.status(200).json({
      publicUrl: '/feed_images/placeholder.png',
      message: 'File upload not yet configured for serverless deployment'
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
