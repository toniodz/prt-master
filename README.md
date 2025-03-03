# Reprocess Your Pain Website

This is the website for Reprocess Your Pain, built with Astro and deployed on Netlify.

## WordPress Integration

This site pulls blog content from a WordPress backend. When new content is published on WordPress, the site automatically rebuilds to reflect the changes.

### Setup Instructions

1. **Netlify Build Hook**:
   - In your Netlify dashboard, go to Site settings > Build & deploy > Build hooks
   - Create a new build hook (e.g., "WordPress Content Update")
   - Copy the generated URL (it will look like `https://api.netlify.com/build_hooks/YOUR_HOOK_ID`)

2. **WordPress Plugin**:
   - Install the "WP Webhooks" plugin on your WordPress site
   - Configure a webhook that triggers when posts are published, updated, or deleted
   - Set the webhook destination URL to the Netlify build hook URL you copied

3. **Testing**:
   - Create or update a post in WordPress
   - Check your Netlify deploy logs to confirm a new build was triggered

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Content Updates

- Blog posts are automatically pulled from WordPress
- Other site content can be updated by editing the Astro files in the `src/pages` directory