import type { Config } from 'tailwindcss';

export default {
    darkMode: 'selector',
    content: ['./src/components/**/*.{html,ts,tsx}', './src/stories/*.{html,ts,tsx}'],
    theme: {
        colors: {
            blue: '#2236b0',
            'blue-light': '#b2c7ee',
        },
        fontFamily: {
            sans: ['Nunito Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        extend: {
            spacing: {
                '8xl': '96rem',
                '9xl': '128rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
} satisfies Config;
