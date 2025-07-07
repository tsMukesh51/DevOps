import express from "express";

const app = express();

app.get('/', (req, res) => {
    console.log('req receved');
    console.log('env' + process.env.MONGO_URL);
    res.send("hi from docking");
});

app.listen(3000);