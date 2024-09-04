import { MongoClient } from "mongodb";
let db;

async function connectToDb(cb)  {

    const client = new MongoClient(`mongodb+srv://tharushapererawork:${process.env.MONGO_PASSWORD}@cluster0ne.l9q6c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0ne`);
    await client.connect();
    
    db = client.db('react-blog-db'); //Reference to our database
    cb();
}

export {
    db,
    connectToDb,
};