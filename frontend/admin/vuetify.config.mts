import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';

export default defineVuetifyConfiguration({
    labComponents: [],
    display: {
        mobileBreakpoint: 'md',
    },
    defaults: {
        global: {
            maxErrors: 3,
        },
        VCard: {
            elevation: 0,
            border: true,
        },
        VSelect: {
            baseColor: 'grey',
            bgColor: 'white',
        },
        VTextarea: {
            baseColor: 'grey',
            bgColor: 'white',
        },
        VTextField: {
            baseColor: 'grey',
            bgColor: 'white',
        },
        VTooltip: {
            openDelay: 500,
        },
    },
});
