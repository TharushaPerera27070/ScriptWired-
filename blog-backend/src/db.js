import { MongoClient } from "mongodb";
let db;

async function connectToDb(cb)  {

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    
    db = client.db('react-blog-db'); //Reference to our database
    cb();
}

export {
    db,
    connectToDb,
};