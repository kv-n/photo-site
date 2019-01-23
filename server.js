//requires

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const photoRouter = ('./routers/photos')

app.set("vew engine", "ejs")


//middleware

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use(express.static('public'));


//routers

app.use('/phots', photoRouter)


//listener
app.listen(3000, function(){
    console.log("Listening to port 3000")
})