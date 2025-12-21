# thearyanahmed.com

Personal website built with [Zola](https://www.getzola.org/) using the [Apollo](https://github.com/not-matthias/apollo) theme.

## Local Development

1. Install Zola (v0.19.2 or later):
   ```bash
   # macOS
   brew install zola

   # Linux
   # Download from https://github.com/getzola/zola/releases
   ```

2. Clone the repository with submodules:
   ```bash
   git clone --recurse-submodules https://github.com/thearyanahmed/thearyanahmed.github.io.git
   cd thearyanahmed.github.io
   ```

3. Serve the site locally:
   ```bash
   zola serve
   ```

4. Build the site:
   ```bash
   zola build
   ```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `zola` branch via GitHub Actions.

## Adding Content

- Blog posts: Add markdown files to `content/posts/`
- Projects: Add markdown files to `content/projects/`

See the [Zola documentation](https://www.getzola.org/documentation/content/overview/) for more details on content creation.
