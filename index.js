//create cars api using express
const path= require('path');
const express = require('express');
//const { dirname } = require('path');
const app = express();
const port = 3001; 


const cors = require("cors");




//const staticPath=path.join(__dirname,'C:\Users\Khodani\Downloads\azure');
app.use(express.static(__dirname))
app.use(cors())

const cars = require('./cars.json');

//get all cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

//get car by id
app.get('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const car = cars.find((car, index) => index === id);
    res.json(car);
});


//update car
app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === id);
    cars[index] = updatedCar;
    res.json(updatedCar);
});

//delete car
app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    cars.splice(index, 1);
    res.json({ message: `Car with id ${id} deleted` });
});

//add car
app.post('/cars', (req, res) => {
    console.log(req);
    const newCar = req.body;
    console.log(newCar);
    cars.push(newCar);
    res.json(newCar);
});



//start app at localhost:3001
app.listen(process.env.PORT || port, () => {
    console.log('Server started at http://localhost:3001');
});