// tailwind.config.js

import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export const content = [
    "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
    extend: {
        fontFamily: {
             title:[
                "Quicksand"
             ]
        },
    },
};
export const plugins = [];