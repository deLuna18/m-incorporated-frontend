/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

export default {
    darkMode: ['selector', '[class="app-dark"]'],
    content: ['./src/**/*.{html,ts,scss,css}', './index.html'],
    plugins: [PrimeUI],
    theme: {
        extend: {
            fontFamily: {
                serif: ['Cormorant Garamond', 'serif'],
                sans: ['Inter', 'sans-serif']
            },
            colors: {
                ivory: '#FFFFFF',
                ink: '#000000',
                charcoal: '#222222',
                muted: '#525252',
                gold: '#000000',
                line: '#D4D4D4'
            },
            boxShadow: {
                editorial: '0 18px 42px rgba(17,17,17,.16)'
            }
        },
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        }
    }
};
