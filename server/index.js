const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const endPoint = '/api/heroes';
const endPoint2 = '/api/awesome_heroes';

massive(process.env.CONNECTION_STRING).then(dbInstance =>{
    app.set('db', dbInstance);
}
    
)

app.get(endPoint, (req, res) => {
    req.app.get('db').get_heroes().then(heroes => {
        console.log(heroes)
        res.status(200).json(heroes)
    }).catch(error => {
        console.log('Oh no an error has happened');
        res.status(500)
    })
})

app.get(endPoint2, (req, res) => {
    req.app.get('db').get_awesome_heroes({ powers: req.query.power, age: req.query.age }).then(heroes => {
        console.log(heroes)
        res.status(200).json(heroes)
    }).catch(error => {
        console.log('Oh no an error has happened');
        res.status(500)
    })
})



const port = 4000;

app.listen(port, () => console.log(`Server is listening on ${port}`));