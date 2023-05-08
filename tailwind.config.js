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
            },
            animation: {
                'bounce-less': 'bounce-less 1s infinite'
            },
            keyframes: {
                'bounce-less': {
                    '0%, 100%': {
                        transform: 'translateY(-5%)',
                        'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
                    },
                    '50%': {
                        transform: 'translateY(0)',
                        'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
                    }
                }
            }
        }
    },
    plugins: []
};
