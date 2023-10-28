import { LatLngTuple } from "leaflet";

export const environment = {
    production: false,
    backend:{
        protocol: 'http',
        host: 'localhost',
        port: 3000,
        endpoints: {
            login: '/auth/login',
            mailConfirm: '/auth',
            profil: '/auth/profile',
            register: '/users',
            allEvents: '/events',
            oneEvent: '/events/:id',
            allEventsByUserId: '/events/user/:id',
            updateOneEvent: '/events/:id',
            deleteOneEvent: '/events/:id',

        }
    },
    mapConfig: {
        maxZoom: 18, // max zoom level
        minZoom: 3, // min zoom level
        defaultZoom: 14, // default zoom level
        center : [ 48.661118, 6.17376 ] as LatLngTuple, // center of Vandoeuvre
    },
    geocode:{
        apiKey: 'aeb1aaa0cba148d48eb67f53cc30eeeb' // Remplacez par votre clé API OpenCage Geocoding
    }

};
