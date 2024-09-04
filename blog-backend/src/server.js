import express from 'express';
import { db, connectToDb} from './db.js';
import fs from 'fs';
import admin from 'firebase-admin';

// let articlesInfo = [
// {
//     name: 'wolverine',
//     upvotes: 0,
//     comments: [],
// },
// {
//     name: 'magneto',
//     upvotes: 0,
//     comments: [],
// },
// ];  ---Added this data to the mongodb database---

const  credentials = JSON.parse(                          //---firebase admin package---
     fs.readFileSync('../credentials.json')
);                                          
admin.initializeApp({
     credential: admin.credential.cert(credentials),
});


const app = express();
app.use(express.json());




app.get('/api/articles/:name', async(req, res) => { // :name is a URL parameter
    const { name } = req.params;               // --- for getting value of the URL parameter ---

    const article = await db.collection('articles').findOne({ name }); 
    
    if(article) {
        res.json(article); //---Use res.json instead of res.send because it's make sure that the correct headers are set on that response.---
    } else {
        res.sendStatus(404);
    }

});

//Up Voting...
app.put('/api/articles/:name/upvote', async(req, res) => {
    const { name } = req.params;
  
    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 }, //inc = increment
    });

    const article = await db.collection('articles').findOne({ name }); 
    
    if(article){
        res.json(article);
    }else{
        res.send('That article doesn\'t exist.');
    }

});


//Commenting...
app.post('/api/articles/:name/comments', async(req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    
    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text}},//---This the way that we tell mongodb to add a new item to an array in it's sort of query object language---

    });

    const article = await db.collection('articles').findOne({ name });//Loading the updated article...
    

    if(article){
    res.json(article);
    }else{
        res.send('That article doesn\'t exist.');
    }

});

connectToDb ( () => {
    console.log('Successfully connected to database!')
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
});

