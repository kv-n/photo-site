//requires
require('./db/db')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const photoRouter = require('./routers/photos.js')

app.set("view engine", "ejs")



//middleware

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use(express.static('public'));


//routers

app.use('/photos', photoRouter)


//listener
app.listen(3000, function(){
    console.log("Listening to port 3000")
})