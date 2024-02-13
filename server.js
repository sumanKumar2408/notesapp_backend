const express = require('express'); 
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
dotenv.config({path: './config.env'});

app.use(cors({
    // origin: "https://notes-app12.netlify.app/", 
    // method: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRouter = require('./routes/users.js');
const noteRouter = require('./routes/notes.js');

app.use(userRouter);
app.use(noteRouter);

const URL = process.env.DB;
const PORT = process.env.PORT || 8000;

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(PORT, (err) => {
    if(err)
        console.log(err);
    else
        console.log(`Server is listening at Port: ${PORT}`);
});
