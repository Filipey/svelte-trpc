/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				platinum: '#D8DBE2',
				'powder-blue': '#A9BCD0',
				moonstone: '#58A4B0',
				charcoal: '#373F51',
				'eerie-black': '#1B1B1E',
				'svelte-main': '#FF3C00',
				'tailwind-main': '#06B6D4',
				'trpc-main': '#398CCB',
				'prisma-main': '#0C344B',
				'sqlite-main': '#4EACE1'
			}
		}
	},
	plugins: []
};
