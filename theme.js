import { buildLegacyTheme } from 'sanity';

const props = {
    '--my-white': '#fff',
    '--my-black': '#000',
    '--my-red': '#db4437',
    '--my-yellow': '#f4b400',
    '--my-green': '#0f9d58',
    '--my-blue': '#26b4e3',
    '--my-purple': '#ab2bda'
};

export const myTheme = buildLegacyTheme({
    '--black': props['--my-black'],
    '--white': props['--my-white'],

    '--gray': '#666',
    '--gray-base': '#666',

    '--component-bg': props['--my-black'],
    '--component-text-color': props['--my-white'],

    // Brand
    '--brand-primary': props['--my-blue'],

    /* Default Button */
    '--default-button-color': '#666',
    '--default-button-primary-color': props['--my-blue'],
    '--default-button-success-color': props['--my-purple'],
    '--default-button-warning-color': props['--my-yellow'],
    '--default-button-danger-color': props['--my-red'],

    /* State */
    '--state-info-color': props['--my-blue'],
    '--state-success-color': props['--my-purple'],
    '--state-warning-color': props['--my-yellow'],
    '--state-danger-color': props['--my-red'],

    /*Navbar */
    '--main-navigation-color': props['--my-black'],
    '--main-navigation-color--inverted': props['--my-white'],

    '--focus-color': props['--my-blue']
});
