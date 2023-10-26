const MongoClient = require('mongodb').MongoClient;

const dbURL = 'mongodb://localhost:27017'; // Use the service name defined in your Docker Compose file
const dbName = 'projectDB';

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

async function createCollections(db) {
  // Create collections or perform other setup tasks as needed
  const usersCollection = await db.createCollection('users');
  const eventsCollection = await db.createCollection('events');
  
  // You can add more collections as necessary

  await usersCollection.insertMany(  [
    {
   mail: 'test1@gmail.com',
   pseudo: 'Jack1',
   isMailConfirmed: 'true',
   password: '9DI1?KWOIDL1'
 },
 {
   mail: 'test2@gmail.com',
   pseudo: 'Jack2',
   isMailConfirmed: 'true',
   password: '9DI1?KWOIDL2'
 },
 {
   mail: 'test3@gmail.com',
   pseudo: 'Jack3',
   isMailConfirmed: 'true',
   password: '9DI1?KWOIDL3'
 }
]);

  await eventsCollection.insertMany( 
    [
      {
        "userId": "652c3f003e6f4e98d985e316",
        "name": "Conference on Artificial Intelligence",
        "dateCreated": "2023-10-12",
        "dateUpdated": "2023-10-14",
        "date": "2023-10-20",
        "location": {
          "city": "Paris",
          "postal_code": "75001",
          "street": "123, AI Street",
          "locationDetails": "the second floor of the main building.",
          "longitude": 2.350987,
          "latitude": 48.856667
        },
        "description": "A conference on the latest bla bla.",
        "startTime": "09:00",
        "color": "#FFF000",
        "type": "Conference"
      },
      {
        "userId": "652c3f003e6f4e98d985e315",
        "name": "Workshop on Machine Learning",
        "dateCreated": "2023-09-15",
        "dateUpdated": "2023-10-14",
        "date": "2023-11-05",
        "location": {
          "city": "Paris",
          "postal_code": "75002",
          "street": "456, ML Street",
          "locationDetails": "the third floor of the ML building.",
          "longitude": 2.352222,
          "latitude": 48.856613
        },
        "description": "Hands-on workshop for ML enthusiasts.",
        "startTime": "14:00",
        "color": "#00FF00",
        "type": "Workshop"
      },
      {
        "userId": "652c3f003e6f4e98d985e317",
        "name": "AI Networking Dinner",
        "dateCreated": "2023-08-20",
        "dateUpdated": "2023-10-14",
        "date": "2023-11-15",
        "location": {
          "city": "Paris",
          "postal_code": "75003",
          "street": "789, AI Plaza",
          "locationDetails": "the grand hall of the AI Center.",
          "longitude": 2.349014,
          "latitude": 48.859217
        },
        "description": "An evening of networking and discussions on AI.",
        "startTime": "18:30",
        "color": "#0000FF",
        "type": "Networking Event"
      }
    ]

   );
  
}


runSetup();
