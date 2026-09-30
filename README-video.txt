L'AURA STUDIO — VIDEO CMS

Video CMS stores video metadata in localStorage. It does NOT upload large video files to a server.
Supported publishing sources:
- YouTube / YouTube Shorts
- Vimeo
- Direct MP4 / WebM / OGG URL

Admin flow:
Admin > Video > + Thêm video > enter URL/title > Lưu video.

Important for production:
GitHub Pages + localStorage is browser-local. To publish videos globally for every visitor, move video records to a real backend/database and use a media host/CDN (Cloudinary, Vimeo, YouTube, Supabase Storage, S3, etc.).
