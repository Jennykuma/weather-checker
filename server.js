const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express(); // create an express application 
const port = 3000;

const apiKey = 'b11cb840317809ece24a4b18f188522f';

// Expose css to Express -> access static files within the public folder
app.use(express.static('public'));

// Help access the req.body object
app.use(bodyParser.urlencoded({ extended: true }));

// EJS accesses the views directory 
app.set('view engine', 'ejs');

// At root URL, it will render the index view
app.get('/', function (req, res) {
    res.render('index', {
        weather: req.weather,
        humidity: req.weather,
        clothing: ``,
        error: req.error
    });
});

// go to root URL -> express will respond with "Hello world!"
app.post('/', function (req, res) {
    let city = req.body.city; // grab city from req.body
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`; // api url
    
    request(url, function (err, response, body) {
        if(err) { // if there is an error
            res.render('index', {weather: null, humidity: null, clothing: null, error: 'error occurred. please try again.'});
        } else {
            let weather = JSON.parse(body); // weather contains the JSON object from the request
            if(weather.main == undefined) { // if the city doesn't 'exist'
                res.render('index', {weather: null, humidity: null, clothing: null, error: 'unknown input. please try again.'});
            } else {
                let weatherResult = `It is ${weather.main.temp} degrees in ${weather.name}!`; // formulate the outputs
                let humidityResult = `Humidity: ${weather.main.humidity}%`;
                
                let clothingResult = ``;
                if (`${weather.main.temp}` < 0) {
                    clothingResult = `Seems pretty cold. You might want to put on a lot of layers.`;
                } else if ((`${weather.main.temp}` > 0) && (`${weather.main.temp}` <= 17)) {
                    clothingResult = `Seems kind of chilly. You might want to put on a jacket.`;
                } else if ((`${weather.main.temp}` > 17)) {
                    clothingResult = `Seems pretty hot. You should probably wear some shorts.`;
                }

                res.render('index', {weather: weatherResult, humidity: humidityResult, clothing: clothingResult, error: null}); // render it
            }
        }
    });
});

// create a server that is listening on port 3000 for connections
app.listen(port, () => console.log(`Example app listening on port ${port}!`));