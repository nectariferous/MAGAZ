import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: '0.0.0.0',
	},
	plugins: [
		react(),
		nodePolyfills(),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
			},
			chunkSizeWarningLimit: 1000, // Увеличение лимита размера чанка (если нужно)
		},
	},
});
