/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#1BA37B',
					hover: '##1A9B74'
				},
				secondary: {
					DEFAULT: '#5EACB8',
					hover: '#3d623d'
				},
				accent: {
					DEFAULT: '#FDE1D3',
					hover: '#fcd0b8'
				}
			},
			fontSize: {
				// Display
				'display-lg': ['clamp(2.5rem, 5vw, 3.5rem)', { lineHeight: '1.2' }],
				'display': ['clamp(2rem, 4vw, 2.75rem)', { lineHeight: '1.2' }],
				'display-sm': ['clamp(1.75rem, 3vw, 2.25rem)', { lineHeight: '1.2' }],
				
				// Headings
				'h1': ['clamp(2rem, 5vw, 2.75rem)', { lineHeight: '1.2' }],
				'h2': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.3' }],
				'h3': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.4' }],
				
				// Body
				'body-lg': ['clamp(1.125rem, 2vw, 1.25rem)', { lineHeight: '1.6' }],
				'body': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.6' }],
				'body-sm': ['clamp(0.875rem, 1vw, 1rem)', { lineHeight: '1.6' }],
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
						h1: {
							fontSize: 'clamp(2rem, 5vw, 2.75rem)',
							lineHeight: '1.2',
						},
						h2: {
							fontSize: 'clamp(1.5rem, 3vw, 2rem)',
							lineHeight: '1.3',
						},
						h3: {
							fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
							lineHeight: '1.4',
						},
						p: {
							fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
							lineHeight: '1.6',
						},
						blockquote: {
							fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
							lineHeight: '1.4',
						},
					},
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}