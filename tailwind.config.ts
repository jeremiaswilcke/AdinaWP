/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Warm, artistic palette inspired by Umani Ronchi
                primary: {
                    50: '#fdf8f6',
                    100: '#f9ede7',
                    200: '#f3d5c8',
                    300: '#e9b5a0',
                    400: '#dc8d6f',
                    500: '#c8714e',
                    600: '#b85c3a',
                    700: '#9a4b30',
                    800: '#7e3f2b',
                    900: '#683727',
                    950: '#381a11',
                },
                accent: {
                    50: '#f6f5f0',
                    100: '#e8e5d8',
                    200: '#d3cdb4',
                    300: '#b9af89',
                    400: '#a49768',
                    500: '#95865a',
                    600: '#806d4b',
                    700: '#67553e',
                    800: '#584838',
                    900: '#4d3f33',
                    950: '#2c221b',
                },
                neutral: {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e',
                    500: '#78716c',
                    600: '#57534e',
                    700: '#44403c',
                    800: '#292524',
                    900: '#1c1917',
                    950: '#0c0a09',
                },
            },
            fontFamily: {
                display: ['var(--font-cormorant)', 'Georgia', 'serif'],
                body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
                'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display-md': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
                'display-sm': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'scale-in': 'scaleIn 0.6s ease-out forwards',
                'parallax': 'parallax linear both',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
};
