# Blog Image Upload Guide

## Overview

The blog system now supports **direct image uploads** from your device instead of requiring image URLs. All uploaded images are stored in `public/images/blog/`.

---

## Features

### ✅ What's Included

1. **TipTap Editor Image Upload**

   - Click the image button in the toolbar
   - Select an image from your device
   - Image is automatically uploaded and inserted

2. **Featured Image Upload**

   - Upload featured images for blog posts
   - Preview before publishing
   - Easy removal and replacement

3. **Automatic Image Processing**
   - Unique filenames (timestamped)
   - File validation (type and size)
   - Secure storage

---

## Supported Image Formats

- ✅ **JPEG** (.jpg, .jpeg)
- ✅ **PNG** (.png)
- ✅ **GIF** (.gif)
- ✅ **WebP** (.webp)

---

## File Size Limit

- **Maximum:** 5MB per image
- Larger files will be rejected with an error message

---

## How to Use

### 1. Uploading Images in Content (TipTap Editor)

**Steps:**

1. Position your cursor where you want the image
2. Click the **image icon** (🖼️) in the toolbar
3. A file picker will open
4. Select your image file
5. Wait for upload (you'll see a loading indicator)
6. Image appears in the editor!

**Features:**

- Shows loading state during upload
- Automatic error handling
- Validates file size and type
- Images are responsive

### 2. Uploading Featured Images

**Steps:**

1. Scroll to "Featured Image" section
2. Click **"Choose File"**
3. Select your image
4. Preview appears immediately
5. Click **X** button to remove if needed

**Features:**

- Live preview
- Easy removal
- Upload progress indicator
- Validation before upload

---

## Storage Location

All blog images are stored in:

```
public/images/blog/
```

### File Naming Convention

Images are automatically renamed to prevent conflicts:

```
[timestamp]-[original-filename]
```

**Example:**

- Original: `sunset.jpg`
- Stored as: `1703001234567-sunset.jpg`

---

## Image URLs

After upload, images are accessible at:

```
/images/blog/[filename]
```

**Example:**

```
/images/blog/1703001234567-sunset.jpg
```

---

## Technical Details

### API Endpoint

**POST** `/api/blog/upload-image`

**Authentication:** Required (Admin only)

**Request:**

- Content-Type: `multipart/form-data`
- Field name: `image`
- File: Image file

**Response:**

```json
{
  "url": "/images/blog/1703001234567-sunset.jpg"
}
```

**Error Responses:**

```json
{
  "error": "File too large. Maximum size is 5MB."
}
```

```json
{
  "error": "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."
}
```

---

## Validation Rules

### 1. Authentication

- ✅ Only authenticated admin users can upload
- ❌ Unauthorized users receive 401 error

### 2. File Type

- ✅ Must be valid image type
- ❌ Other file types are rejected

### 3. File Size

- ✅ Must be under 5MB
- ❌ Larger files are rejected

### 4. Filename

- ✅ Special characters are replaced with hyphens
- ✅ Timestamp prefix prevents conflicts

---

## Error Handling

### Common Errors

**"No file uploaded"**

- Cause: No file selected
- Solution: Select a file before uploading

**"Invalid file type"**

- Cause: Unsupported file format
- Solution: Use JPEG, PNG, GIF, or WebP

**"File too large"**

- Cause: File exceeds 5MB
- Solution: Compress or resize the image

**"Unauthorized"**

- Cause: Not logged in as admin
- Solution: Login first

**"Failed to upload image"**

- Cause: Server error
- Solution: Try again or check server logs

---

## Best Practices

### 1. Image Optimization

**Before uploading:**

- ✅ Compress images (use tools like TinyPNG)
- ✅ Resize to appropriate dimensions
- ✅ Use WebP format for better compression
- ✅ Keep file size under 1MB when possible

**Recommended dimensions:**

- **Featured images:** 1200 x 630 px
- **Content images:** 800 x 600 px (or appropriate)
- **Thumbnails:** 400 x 300 px

### 2. Image Quality

- Use high-quality original images
- Avoid excessive compression
- Test images on different devices
- Check image appearance in light/dark mode

### 3. Accessibility

After uploading, consider adding:

- Descriptive alt text in HTML
- Captions where appropriate
- Proper context in surrounding content

### 4. File Management

- Delete unused images periodically
- Use descriptive original filenames
- Organize images by topic/date if needed
- Keep backups of important images

---

## Image Management

### Viewing Uploaded Images

All images are in:

```
public/images/blog/
```

You can view them at:

```
http://localhost:3040/images/blog/[filename]
```

### Deleting Images

**Manual deletion:**

1. Navigate to `public/images/blog/`
2. Delete unwanted files
3. Note: Blog posts will show broken images if you delete referenced files

**Best practice:**

- Only delete images not used in any posts
- Check all posts before deleting
- Keep a backup before bulk deletions

---

## Troubleshooting

### Image Not Uploading

**Check:**

1. ✅ Are you logged in as admin?
2. ✅ Is the file size under 5MB?
3. ✅ Is the file format supported?
4. ✅ Is your internet connection stable?
5. ✅ Check browser console for errors

### Image Not Displaying

**Check:**

1. ✅ Does the file exist in `public/images/blog/`?
2. ✅ Is the path correct in the database?
3. ✅ Are file permissions correct?
4. ✅ Clear browser cache
5. ✅ Check Next.js server logs

### Upload Very Slow

**Possible causes:**

- Large file size (compress before upload)
- Slow internet connection
- Server performance issues

**Solutions:**

- Compress images before upload
- Use WebP format
- Upload during off-peak hours

---

## Security

### Built-in Protection

1. **Authentication Required**

   - Only admin users can upload
   - JWT token validation

2. **File Type Validation**

   - Server-side MIME type checking
   - Prevents malicious file uploads

3. **File Size Limits**

   - Prevents DOS attacks
   - Protects server storage

4. **Filename Sanitization**

   - Removes dangerous characters
   - Prevents directory traversal

5. **Unique Filenames**
   - Timestamp-based naming
   - Prevents overwrites

---

## Performance Tips

### For Faster Uploads

1. **Optimize before upload:**

   ```
   - Use compression tools
   - Resize to needed dimensions
   - Convert to WebP format
   ```

2. **Batch operations:**

   - Upload multiple images at once if needed
   - Use external tools for bulk optimization

3. **CDN consideration (future):**
   - For production, consider CDN integration
   - Faster global delivery
   - Reduced server load

---

## Directory Structure

```
public/
└── images/
    └── blog/
        ├── 1703001234567-sunset.jpg
        ├── 1703001235789-mountain.png
        ├── 1703001237890-ocean.webp
        └── ... (all blog images)
```

---

## API Code Example

### JavaScript/TypeScript

```typescript
async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("/api/blog/upload-image", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const data = await response.json();
  return data.url; // Returns: "/images/blog/1703001234567-sunset.jpg"
}
```

### Usage in Component

```typescript
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const imageUrl = await uploadImage(file);
    console.log("Image uploaded:", imageUrl);
    // Use the imageUrl in your blog post
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Failed to upload image");
  }
};
```

---

## Future Enhancements

### Possible Additions

1. **Image Gallery**

   - Browse previously uploaded images
   - Reuse images across posts
   - Bulk upload interface

2. **Image Editor**

   - Crop and resize in-browser
   - Filters and adjustments
   - Text overlay

3. **CDN Integration**

   - Cloudinary integration
   - AWS S3 storage
   - Automatic optimization

4. **Advanced Features**
   - Drag-and-drop upload
   - Paste from clipboard
   - Image compression on upload
   - Multiple image selection

---

## Summary

✅ **What You Can Do:**

- Upload images directly from device
- Insert images in blog content
- Add featured images to posts
- Preview images before publishing
- Remove and replace images easily

✅ **What's Protected:**

- Only admins can upload
- File type validation
- File size limits
- Secure storage
- Unique filenames

✅ **What's Stored:**

- Location: `public/images/blog/`
- Format: Timestamped filenames
- Access: Public URLs
- Retention: Permanent (until manually deleted)

---

**Happy Blogging! 📸✨**

Your blog now has professional image management!
