# Setup Instructions

## Customization Checklist

### 1. Profile Picture
- Add your profile picture to `static/avatar.png` (or avatar.jpg)
- Update the theme configuration if needed to reference your avatar

### 2. Update Personal Information

Edit `config.toml`:
- Update social media URLs (Twitter, Mastodon, LinkedIn, Email)
- Replace placeholders with your actual handles/links

### 3. Update Homepage Bio

Edit `content/_index.md`:
- Replace `[Your Company Name]` with your previous company
- Replace `[Your Role]` with your role
- Replace `[Current Company]` with your current employer
- Replace `[Your Current Role]` with your current role
- Replace `[your favorite technology/language]` with your tech stack
- Update `@your_handle` with your actual Twitter handle

### 4. Optional Pages

If you don't have a book or don't want certain sections:
- Remove the corresponding menu items from `config.toml`
- Delete the corresponding content directories

### 5. Add Content

- Add blog posts to `content/posts/`
- Add talks to `content/talks/`
- Update subscribe page with your newsletter service

## File Structure

```
content/
├── _index.md          # Homepage
├── posts/             # Blog posts
│   └── _index.md
├── projects/          # Projects
│   └── _index.md
├── talks/             # Talks
│   └── _index.md
├── book/              # Book page
│   └── _index.md
└── subscribe/         # Newsletter subscription
    └── _index.md
```
