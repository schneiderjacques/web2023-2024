import { LatLngTuple } from "leaflet";

export const environment = {
    production: false,
    backend:{
        protocol: 'http',
        host: 'localhost',
        port: 3000,
        endpoints: {
            login: '/auth/login',
            profil: '/auth/profile',
            register: '/users',
            allEvents: '/events',
            oneEvent: '/events/:id',

        }
    },
    mapConfig: {
        maxZoom: 18, // max zoom level
        minZoom: 3, // min zoom level
        defaultZoom: 14, // default zoom level
        center : [ 48.661118, 6.17376 ] as LatLngTuple, // center of Vandoeuvre
    }

};
