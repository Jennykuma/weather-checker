const express = require('express')
const app = express() // create an express application 
const port = 3000

// EJS accesses the views directory 
app.set('view engine', 'ejs')

// Expose css to Express -> access static files within the public folder
app.use(express.static('public'))

// go to root URL -> express will respond with "Hello world!"
app.get('/', (req, res) => res.render('index'))

// create a server that is listening on port 3000 for connections
app.listen(port, () => console.log(`Example app listening on port ${port}!`))