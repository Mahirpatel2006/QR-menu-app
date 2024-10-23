import { MongoClient } from 'mongodb';

const uri: string | undefined = process.env.DATABASE_URL;

if (!uri) {
  throw new Error('Please define the DATABASE_URL environment variable inside .env');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Allow global type for the Node.js global object to avoid type conflicts
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the client across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  clientPromise = client.connect();
}

export default clientPromise;
