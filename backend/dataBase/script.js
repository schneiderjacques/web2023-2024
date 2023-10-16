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
  await db.createCollection('events');
  await db.createCollection('users');
  // You can add more collections as necessary
}

runSetup();
