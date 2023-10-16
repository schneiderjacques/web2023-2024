db.getCollection('users').createIndex(
    { mail: 1 },
    { unique: true },
  );
  