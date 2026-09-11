import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.endchronicdisease.org',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
