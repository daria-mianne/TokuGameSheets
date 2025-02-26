// oh god please let me figure out how to get rid of this red squiggle
// i swear it's real, it just comes from vite's config's define block
export const localDevApiPort = __API_PORT__;
export const apiBaseUrl =
    process.env.NODE_ENV === 'production'
        ? __API_PATH__
        : `http://localhost:${localDevApiPort}${__API_PATH__}`;