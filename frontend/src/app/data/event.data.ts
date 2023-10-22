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
    description: 'Une journée de musique dans les rues de Paris.',
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
  }
];

