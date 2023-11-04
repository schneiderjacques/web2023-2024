const { MongoClient, ObjectId } = require('mongodb');

// Your MongoDB connection details
const dbURL = 'mongodb://localhost:27017';
const dbName = 'projectDB';

async function createCollections(db) {
  const usersCollection = await db.createCollection('users');
  const eventsCollection = await db.createCollection('events');

  // Create a unique index on the 'mail' field in the 'users' collection
  await usersCollection.createIndex(
    { mail: 1 },
    { unique: true }
  );

  // Insert data into collections with ObjectId
  await usersCollection.insertMany([
    {
      _id: new ObjectId("653cd1609217d448cecdfe65"),
      mail: "test123@test.fr",
      pseudo: "User 1",
      isMailConfirmed: true,
      password: "$2b$10$emq0VBcAqTRtN2f3C9xmiuyDNlFj9i0dMNE/ju7S.j7ocjDku5iNy"
    },
    {
      _id: new ObjectId("654283217a1f81f58a1b0038"),
      mail: "test.nom@test.fr",
      pseudo: "User 2",
      isMailConfirmed: true,
      password: "$2b$10$9oA6l0xVzAkxrHW3U6h6PO4804AkMX7EUvTvCtJsueUwDSgb7Kr.6"
    },
    {
      _id : new ObjectId("654505b1e485ea840aca5d8f"),
      mail : "test@test.fr",
      pseudo : "User 3",
      isMailConfirmed : true,
      password : "$2b$10$1QnEmrWPoLKImuGOB8FQ6uGeLrmU2g5V2R4BCTxoqglS6wC/tdocW"
  }
    // Add more user documents with ObjectId
  ]);

  await eventsCollection.insertMany([
    {
      _id: new ObjectId("653e8fe9d9201f45fef8bb8c"),
      userId: new ObjectId("653cd1609217d448cecdfe65"),
      name: "Fête de la musique",
      dateCreated: "2023-10-29T17:01:29.250+0000",
      dateUpdated: "2023-10-29T17:01:29.250+0000",
      date: "2024-12-13T23:00:00.000+0000",
      location: {
        city: "Forbach-Boulay-Moselle",
        postalCode: 57320,
        street: "3 Chemin de Neudorff",
        locationDetails: "Près de l’arc de triomphe",
        latitude: 49.30533320226847,
        longitude: 6.450385312900956
      },
      description: "Une journée de musique dans les rues de Paris. Venez nombreux ! Il y en aura pour tous les goûts festifs. Regardez le programme sur le site officiel.",
      startTime: "15:00",
      color: "#5669ff",
      type: "Musique"
    },
    {
      _id: new ObjectId("654284007a1f81f58a1b0052"),
      userId: new ObjectId("654283217a1f81f58a1b0038"),
      name: "Sum 41",
      dateCreated: "2023-11-01T16:59:44.754+0000",
      dateUpdated: "2023-11-03T14:22:29.634+0000",
      date: "2023-11-01T00:00:00.000+0000",
      location: {
        locationDetails: "",
        street: "Rue des Capucins",
        city: "Luxembourg",
        postalCode: 1313,
        latitude: 49.6124913,
        longitude: 6.1296777
      },
      description: "Sum 41 est un groupe canadien de rock alternatif, originaire d'Ajax, dans la province d'Ontario.",
      startTime: "20:45",
      color: "#65aee6",
      type: "Concert"
    },
    {
      _id: new ObjectId("65428cb77b61120f09f6be6f"),
      userId: new ObjectId("654283217a1f81f58a1b0038"),
      name: "Soirée Halloween",
      dateCreated: "2023-11-01T17:36:55.794+0000",
      dateUpdated: "2023-11-01T21:53:57.991+0000",
      date: "2023-11-01T00:00:00.000+0000",
      location: {
        locationDetails: "",
        street: "8 Rue Taison",
        city: "Metz",
        postalCode: 57014,
        latitude: 49.1189768,
        longitude: 6.177242
      },
      description: "Venez tous à ma super soirée d'halloween.",
      startTime: "21:30",
      color: "#cdb542",
      type: "Soirée"
    },
    {
      _id: new ObjectId("6542c9d5ca447e071e8ce55f"),
      userId: new ObjectId("654283217a1f81f58a1b0038"),
      name: "Match Metz-Nancy",
      dateCreated: "2023-11-01T21:57:41.347+0000",
      dateUpdated: "2023-11-01T21:57:41.347+0000",
      date: "2023-10-31T23:00:00.000+0000",
      location: {
        city: "Metz",
        postalCode: 57050,
        street: "9-11 Place de l'Église",
        locationDetails: "Stade Saînt-Symphorien",
        latitude: 49.1135592,
        longitude: 6.1535489
      },
      description: "Le derby lorrain est le nom donné au match de football opposant le FC Metz et l'AS Nancy-Lorraine. Cette rencontre sportive se caractérise comme un derby en raison des 47 km qui séparent les deux villes de Nancy et Metz. Cette expression de « derby lorrain » est couramment reprise par la presse et l'ensemble des supporteurs pour évoquer la rencontre sportive entre ces deux villes1.",
      startTime: "21:00",
      color: "#731013",
      type: "Football"
    },
    {
      _id: new ObjectId("654501b93ccd3f04dbcc9b8b"),
      userId: new ObjectId("654283217a1f81f58a1b0038"),
      name: "La magie du marais",
      dateCreated: "2023-11-03T14:20:41.485+0000",
      dateUpdated: "2023-11-03T14:20:41.485+0000",
      date: "2023-11-06T23:00:00.000+0000",
      location: {
        city: "Paris 4e Arrondissement",
        postalCode: 75004,
        street: "1 Port de l'Hôtel-de-Ville",
        locationDetails: "",
        latitude: 48.8528752978888,
        longitude: 2.357392562980776
      },
      description: "Billet à partir de 20.00 €.\nVenez découvrir ce super spectacle",
      startTime: "20:15",
      color: "#50ce93",
      type: "Magie"
    },
    {
      _id: new ObjectId("65450648e485ea840aca5d96"),
      userId: new ObjectId("654505b1e485ea840aca5d8f"),
      name: "Beach party",
      dateCreated: "2023-11-03T14:40:08.288+0000",
      dateUpdated: "2023-11-03T14:40:08.288+0000",
      date: "2024-06-24T22:00:00.000+0000",
      location: {
        city: "Arcachon",
        postalCode: 33120,
        street: "2 Place du Docteur Peyneau",
        locationDetails: "Près de la jetée d'ayrac",
        latitude: 44.663764396893114,
        longitude: -1.1634029534774304
      },
      description: "Soirée à la plage !",
      startTime: "12:15",
      color: "#f0f344",
      type: "Plage"
    },
    {
      _id: new ObjectId("65450695e485ea840aca5d99"),
      userId: new ObjectId("654505b1e485ea840aca5d8f"),
      name: "Spectacle de rue",
      dateCreated: "2023-11-03T14:41:25.620+0000",
      dateUpdated: "2023-11-03T14:41:25.620+0000",
      date: "2023-11-15T23:00:00.000+0000",
      location: {
        city: "Hyères",
        postalCode: 83400,
        street: "Place d'Armes",
        locationDetails: "",
        latitude: 43.00053976109064,
        longitude: 6.2032290857087125
      },
      description: "Venez nombreux !",
      startTime: "12:15",
      color: "#b0b0b0",
      type: "Spectacle"
    },
    {
      _id: new ObjectId("6545072ae485ea840aca5d9c"),
      userId: new ObjectId("654505b1e485ea840aca5d8f"),
      name: "Déambulation",
      dateCreated: "2023-11-03T14:43:54.562+0000",
      dateUpdated: "2023-11-03T14:46:11.825+0000",
      date: "2023-11-12T00:00:00.000+0000",
      location: {
        locationDetails: "",
        street: "3 Cour de l'Aubette",
        city: "Strasbourg",
        postalCode: 67000,
        latitude: 48.5839476,
        longitude: 7.7458876
      },
      description: "Novembre 1918, le peuple se soulève à Strasbourg comme dans toute l’Alsace-Lorraine. La guerre s’achève, les troupes françaises arrivent et la révolution allemande commence. L’Alsace participe à ses premiers développements se transforme en carrefour des désirs, des peurs et des espoirs.",
      startTime: "12:15",
      color: "#957575",
      type: "Révolution"
    },
    // Add more event documents with ObjectId
  ]);
}

async function runSetup() {
  const client = new MongoClient(dbURL, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB.');
    const db = client.db(dbName);
    // Perform setup tasks here, e.g., create collections, insert initial data, etc.
    await createCollections(db);
    console.log('Setup complete.');
  } catch (err) {
    console.error('Error during setup:', err);
  } finally {
    await client.close();
  }
}

runSetup();
