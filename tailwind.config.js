/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                primary: '#26b4e3',
                secondary: '#ab2bda'
            },
            fontFamily: {
                RobotoMono: ['RobotoMono', 'monospace']
            }
        }
    },
    plugins: []
};
