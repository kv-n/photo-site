const express = require('express')
const router = express.Router()
//model data goes here
const Photo = require('../models/photos')


//ROUTES

//index
router.get('/', (req, res) => {
    console.log('hit')
    Photo.find({}, (err, allPhotos) => {
        if (err) {
            res.send(err)
        } else {
            res.render("index", {
                photos: allPhotos
            })
        }
    })
})

//new route//rendering create form
// router.get('/new', (req, res) => {

// })


//create route //create in our database
// router.post('/', (req, res) => {

// })


//edit route//edit form
// router.get('/:id/edit', (req, res) => {

// })

//update//edits into databse
// router.put(':id', (req, res) => {

// })

//show
// router.get(':/id', (req, res) => {

// })

//delete
// router.delete('/:id', (req, res) => {

// })

module.exports = router