# Portfolio Project - File Structure & Setup Guide

## Project Structure

```
My-Professional-Portfolio/
├── dist/
│   ├── index.html              # Main HTML file
│   ├── output.css              # Compiled Tailwind CSS
│   ├── script.js               # Main JavaScript (modals & interactions)
│   ├── modals.html             # Separate modals file
│   ├── RESUME AND LETTER.pdf   # Resume PDF
│   ├── image/                  # Images folder
│   │   ├── Profile2.jpg
│   │   ├── Project.png
│   │   ├── Gate monitoring system.png
│   │   ├── Event Task manager.jpg
│   │   ├── Programming foundations.jpg
│   │   ├── Incident Response...jpg
│   │   └── ... (more certificate images)
│   ├── video/                  # Videos folder
│   │   └── DEMO PRESENTATION.mp4
│   └── js/                     # JavaScript folder
│       └── modals-loader.js    # Loads modals dynamically
├── src/
│   └── input.css               # Source CSS (Tailwind)
├── package.json
├── tailwind.config.js
└── vercel.json
```

## How to Add Files

### 1. Add Images

**Location:** `dist/image/`

**How to reference in HTML:**

```html
<!-- Profile image -->
<img src="image/your-image.jpg" alt="Description" />

<!-- Certificate image -->
<img src="image/certificate-name.jpg" alt="Certificate" />
```

### 2. Add PDFs

**Location:** `dist/` (root of dist folder)

**How to reference in HTML:**

```html
<!-- Download link -->
<a href="resume.pdf" download>Download Resume</a>

<!-- View in new tab -->
<a href="resume.pdf" target="_blank" rel="noopener noreferrer">View PDF</a>

<!-- Embed as iframe -->
<iframe src="resume.pdf" width="100%" height="600"></iframe>
```

### 3. Add Videos

**Location:** `dist/video/`

**How to reference in HTML:**

```html
<video controls width="100%">
  <source src="video/presentation.mp4" type="video/mp4" />
  Your browser does not support HTML5 video.
</video>
```

## Modals Organization

All modals (skill, certificate, project) are now stored in a separate file for better code organization:

- **Modals HTML:** [dist/modals.html](dist/modals.html)
- **Modal Loader Script:** [dist/js/modals-loader.js](dist/js/modals-loader.js)
- **Modal JavaScript Logic:** [dist/script.js](dist/script.js)

### Modal Types

1. **Skill Modals** - Backend Frameworks, Developer Tools
2. **Certificate Modals** - cert-1 to cert-5
3. **Project Modals** - project-1 to project-4

### How Modals Work

1. User clicks on a card with `data-cert-modal`, `data-project-modal`, or `data-skill-modal` attribute
2. `script.js` listens for the click and calls `openModal(modalId)`
3. The modal HTML is loaded from `modals.html` via `modals-loader.js`
4. Modal opens with smooth animation
5. Click close button, overlay, or press ESC to close

## Building & Deployment

### Development

```bash
npm run dev
```

Watches for CSS changes and rebuilds `output.css`

### Production

```bash
npm run build
```

Minifies CSS for production

## Naming Conventions

- **Images:** Use lowercase with hyphens: `profile-pic.jpg`, `certificate-name.jpg`
- **PDFs:** Use descriptive names: `resume.pdf`, `cover-letter.pdf`
- **Videos:** Use clear names: `project-demo.mp4`, `intro.mp4`
- **Folders:** Keep folders simple: `image/`, `video/`, `assets/`

## File Size Guidelines

- **Images:** Keep under 2MB (compress before uploading)
- **Videos:** Keep under 20MB (consider compression)
- **PDFs:** Keep under 5MB

## Tips for Organization

1. Use subfolders in `image/` for different categories:

   ```
   image/
   ├── projects/
   ├── certificates/
   ├── skills/
   └── profile/
   ```

2. Keep file names consistent and descriptive
3. Always test URLs after adding new files
4. Verify images load before deploying
5. Check PDF/video links work in both desktop and mobile

## Troubleshooting

| Issue             | Solution                                                      |
| ----------------- | ------------------------------------------------------------- |
| Image not showing | Check file path and verify file exists in `image/` folder     |
| PDF link broken   | Ensure PDF is in `dist/` root and path is correct             |
| Modal not loading | Check browser console for errors, verify `modals.html` exists |
| Video won't play  | Check video format (MP4 preferred) and file size              |

## Path Examples

```
✓ <img src="image/profile.jpg">              - Correct
✓ <a href="resume.pdf">                      - Correct
✓ <source src="video/demo.mp4">              - Correct
✗ <img src="/image/profile.jpg">             - Wrong (absolute path)
✗ <a href="dist/resume.pdf">                 - Wrong (extra dist/)
```

---

For more help, check existing HTML references or update `modals.html` for new modals.
