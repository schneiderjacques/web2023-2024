// Exemple d'array d'événements en France
import {Event} from "../shared/types/event.type";

export const EVENTS: Event[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Fête de la Musique',
    dateCreated: '2023-06-15T12:00:00',
    dateUpdated: '2023-06-15T12:00:00',
    date: '2023-06-21',
    location: {
      city: 'Paris',
      postalCode: '75000',
      street: 'Champs-Élysées',
      locationDetails: 'Près de l\'Arc de Triomphe',
      longitude: 2.295, // Exemple de coordonnées GPS pour Paris
      latitude: 48.873, // Exemple de coordonnées GPS pour Paris
    },
    description: 'Une journée de musique dans les rues de Paris. Venez nombreux ! Il y en aura pour tous les goûts festifs. Regardez le programme sur le site officiel.',
    startTime: '15:00',
    color: 'blue',
    type: 'Musique',
  },
  {
    id: '2',
    userId: 'user2',
    name: 'Salon du Vin',
    dateCreated: '2023-08-10T10:30:00',
    dateUpdated: '2023-08-10T10:30:00',
    date: '2023-09-05',
    location: {
      city: 'Bordeaux',
      postalCode: '33000',
      street: 'Palais des Congrès',
      locationDetails: 'Salle A',
      longitude: -0.585, // Exemple de coordonnées GPS pour Bordeaux
      latitude: 44.838, // Exemple de coordonnées GPS pour Bordeaux
    },
    description: 'Découvrez les meilleurs vins de Bordeaux lors de ce salon.',
    startTime: '14:00',
    color: 'red',
    type: 'Vin',
  },
  {
    id: '3',
    userId: 'user3',
    name: 'Festival de Cannes',
    dateCreated: '2023-05-20T09:00:00',
    dateUpdated: '2023-05-20T09:00:00',
    date: '2023-07-06',
    location: {
      city: 'Cannes',
      postalCode: '06400',
      street: 'Palais des Festivals et des Congrès',
      locationDetails: 'Salle de projection 1',
      longitude: 7.018, // Exemple de coordonnées GPS pour Cannes
      latitude: 43.551, // Exemple de coordonnées GPS pour Cannes
    },
    description: 'Le plus grand festival de cinéma au monde.',
    startTime: '10:00',
    color: 'gold',
    type: 'Cinéma',
  },
  {
    id: '4',
    userId: 'user4',
    name: 'Tour de France',
    dateCreated: '2023-03-01T14:30:00',
    dateUpdated: '2023-03-01T14:30:00',
    date: '2023-07-01',
    location: {
      city: 'Nice',
      postalCode: '06000',
      street: 'Promenade des Anglais',
      locationDetails: 'Départ de l\'étape',
      longitude: 7.258, // Exemple de coordonnées GPS pour Nice
      latitude: 43.695, // Exemple de coordonnées GPS pour Nice
    },
    description: 'Le célèbre Tour de France cycliste.',
    startTime: '12:30',
    color: 'yellow',
    type: 'Cyclisme',
  },
  {
    id: "5",
    "userId": "user5",
    "name": "Nouvel événement 1",
    "dateCreated": "2023-10-15T10:00:00",
    "dateUpdated": "2023-10-15T10:00:00",
    "date": "2023-10-20",
    "location": {
      "city": "Lyon",
      "postalCode": "69000",
      "street": "Place Bellecour",
      "locationDetails": "Scène principale",
      "longitude": 4.834,
      "latitude": 45.753
    },
    "description": "Description du nouvel événement 1.",
    "startTime": "18:00",
    "color": "green",
    "type": "Autre"
  },
  {
    "id": "6",
    "userId": "user6",
    "name": "Nouvel événement 2",
    "dateCreated": "2023-11-05T14:30:00",
    "dateUpdated": "2023-11-05T14:30:00",
    "date": "2023-11-10",
    "location": {
      "city": "Marseille",
      "postalCode": "13000",
      "street": "Vieux-Port",
      "locationDetails": "Quai des Belges",
      "longitude": 5.369,
      "latitude": 43.296
    },
    "description": "Description du nouvel événement 2.",
    "startTime": "19:00",
    "color": "purple",
    "type": "Autre"
  },
  {
    "id": "7",
    "userId": "user7",
    "name": "Nouvel événement 3",
    "dateCreated": "2023-12-20T08:45:00",
    "dateUpdated": "2023-12-20T08:45:00",
    "date": "2024-01-05",
    "location": {
      "city": "Toulouse",
      "postalCode": "31000",
      "street": "Place du Capitole",
      "locationDetails": "Grande scène",
      "longitude": 1.444,
      "latitude": 43.604
    },
    "description": "Description du nouvel événement 3.",
    "startTime": "16:30",
    "color": "orange",
    "type": "Festival"
  },
  {
    "id": "8",
    "userId": "user8",
    "name": "Nouvel événement 4",
    "dateCreated": "2023-12-30T12:15:00",
    "dateUpdated": "2023-12-30T12:15:00",
    "date": "2024-01-15",
    "location": {
      "city": "Strasbourg",
      "postalCode": "67000",
      "street": "Place Kléber",
      "locationDetails": "Place de la Cathédrale",
      "longitude": 7.752,
      "latitude": 48.583
    },
    "description": "Description du nouvel événement 4.",
    "startTime": "17:00",
    "color": "pink",
    "type": "Culture"
  },
  {
    "id": "9",
    "userId": "user9",
    "name": "Nouvel événement 5",
    "dateCreated": "2024-01-10T15:20:00",
    "dateUpdated": "2024-01-10T15:20:00",
    "date": "2024-01-25",
    "location": {
      "city": "Biarritz",
      "postalCode": "64200",
      "street": "Plage de la Côte des Basques",
      "locationDetails": "Scène en plein air",
      "longitude": -1.564,
      "latitude": 43.480
    },
    "description": "Description du nouvel événement 5.",
    "startTime": "20:30",
    "color": "turquoise",
    "type": "Musique"
  }
];

