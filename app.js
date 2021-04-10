const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json())
const port = 80;

app.use('/static', express.static('static')) //for serving static files
app.use(express.urlencoded());

app.set('view engine', 'pug') // set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the view directory

mongoose.connect('mongodb://localhost/danceDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const danceSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobno: Number,
    gender: String,

});

const Dance = mongoose.model('Dance', danceSchema);


app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('index.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/events', (req, res) => {
    const params = {}
    res.status(200).render('events.pug', params);
})

app.post('/', (req, res,) => {
    console.log(req.body)
    const dance = new Dance(req.body)
    dance.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
})

app.listen(port, () => {
    console.log(`The app is started on port ${port}`);
})