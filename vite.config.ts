import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import react from '@vitejs/plugin-react-swc';

const key = fs.readFileSync('./cert.key');
const cert = fs.readFileSync('./cert.crt');
const httpsConfig = { key, cert };

const HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  // "X-Frame-Options": "DENY",
  // 'X-Frame-Options': 'SAMEORIGIN'
  'X-XSS-Protection': '1; mode=block',
};

// Custom plugin to inline favicon
function inlineFavicon() {
  return {
    name: 'inline-favicon',
    transformIndexHtml(html: string) {
      // Match any favicon link tag
      const faviconRegex = /<link[^>]*rel="icon"[^>]*href="([^"]*)"[^>]*>/i;
      const match = html.match(faviconRegex);

      if (match) {
        const hrefMatch = match[1];
        // Remove leading ./ or / from href
        const cleanPath = hrefMatch.replace(/^\.?\//, '');

        // Check multiple possible locations
        const possiblePaths = [
          path.resolve(cleanPath),
          path.resolve('public', cleanPath),
          path.resolve('src', cleanPath),
          path.resolve('.', cleanPath),
        ];

        for (const faviconPath of possiblePaths) {
          if (fs.existsSync(faviconPath)) {
            const favicon = fs.readFileSync(faviconPath);
            const base64Favicon = favicon.toString('base64');
            const mimeType = faviconPath.endsWith('.svg')
              ? 'image/svg+xml'
              : faviconPath.endsWith('.png')
                ? 'image/png'
                : 'image/x-icon';

            return html.replace(
              match[0],
              `<link rel="icon" type="${mimeType}" href="data:${mimeType};base64,${base64Favicon}" />`
            );
          }
        }
      }
      return html;
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  build: {
    cssCodeSplit: false,
    minify: 'esbuild',
    rollupOptions: {
      external: [
        // '@emotion/react',
        // '@emotion/styled',
        '@fontsource/roboto',
        '@mui/icons-material',
        '@mui/material',
        'react',
        'react-dom',
        // 'react-markdown',
        // 'zod',
        // 'zod-to-json-schema',
      ],
      input: {
        app: './index.html',
      },
      output: {
        globals: {
          // '@emotion/react': 'EmotionReact',
          // '@emotion/styled': 'EmotionStyled',
          // '@fontsource/roboto': 'Roboto',
          // '@mui/icons-material': 'MUIIconsMaterial',
          // '@mui/material': 'MUIMaterial',
          // react: 'React',
          // 'react-dom': 'ReactDOM',
          // 'react-markdown': 'ReactMarkdown',
          // zod: 'Zod',
          // 'zod-to-json-schema': 'ZodToJsonSchema',
        },
        inlineDynamicImports: true,
        manualChunks: undefined,
      },
    },
    assetsInlineLimit: Infinity,
    sourcemap: process.env.NODE_ENV !== 'production',
  },
  envPrefix: ['VITE_', 'APP_'],
  optimizeDeps: {
    force: true,
  },
  plugins: [
    react(),
    inlineFavicon(), // Should be before viteSingleFile
    viteSingleFile(),
  ],
  preview: {
    port: 8080,
    host: process.env.EXPOSE_DEV_SERVER ? true : 'localhost',
    https: httpsConfig,
    strictPort: true,
    headers: HEADERS,
  },
  resolve: {
    alias: {
      '#': path.resolve(__dirname), // For #/<anything>
      '~': path.resolve(__dirname, 'src'), // Alias for "src" directory
      assets: path.resolve(__dirname, 'src/assets'), // Direct "assets" alias
      constants: path.resolve(__dirname, 'src/constants'), // Direct "constants" alias
      shared: path.resolve(__dirname, 'src/shared'), // Direct "shared" alias
      types: path.resolve(__dirname, 'src/types'), // Direct "types" alias
    },
  },
  server: {
    port: 9001,
    host: process.env.EXPOSE_DEV_SERVER ? true : 'localhost',
    https: httpsConfig,
    strictPort: true,
    headers: HEADERS,
  },
});
