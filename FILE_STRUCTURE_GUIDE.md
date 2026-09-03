# Portfolio Project - React Setup Guide

## Project Structure

```
My-Professional-Portfolio/
├── index.html                  # Vite entry document
├── src/
│   ├── App.jsx                 # React UI, state, and interactions
│   ├── main.jsx                # React root mount
│   ├── RESUME AND LETTER.pdf   # Resume PDF
├── dist/                       # Vite/Tailwind production output
│   ├── index.html
│   ├── output.css
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
│   └── video/                  # Videos folder
├── src/input.css                # Source CSS (Tailwind)
├── vite.config.js
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

## React Interactions

All interactions are owned by React in `src/App.jsx`:

- Project, certificate, skill, and email dialogs use component state.
- Navigation and mobile menu state are handled with React events.
- The contact form is controlled, validated, and opens a mailto fallback.
- The typewriter and active-section navigation use React effects.

## Building & Deployment

### Development

```bash
npm start
```

Starts the Vite development server.

### Production

```bash
npm run build
```

Builds Tailwind CSS and bundles the React app into `dist/`.

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
| Modal not loading | Check browser console for React errors and verify the modal state handler in `src/App.jsx` |
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

For more help, add new portfolio content to the data arrays and components in `src/App.jsx`.
