const express = require('express')
const router = express.Router()
//model data goes here
const Photo = require('../models/photos')


//ROUTES

//index
router.get('/', (req, res) => {
    Photo.find({}, (err, allPhotos) => {
        if (err) {
            res.send(err)
        } else {
            res.render("photos/index", {
                photos: allPhotos
            })
        }
    })
})

//new route//rendering create form
router.get('/new', (req, res) => {
    res.render('photos/new')
})


//create route //create in our database
router.post('/', (req, res) => {
    Photo.create(req.body, (err, createdImage) => {
        if (err) {
            res.send(err)
        } else {
            console.log(createdImage + ' has been added to the database')
            res.redirect('/photos')
        }
    })
})


//edit route//edit form
router.get('/:id/edit', (req, res) => {
    Photo.findById(req.params.id, (err, editPhoto) => {
        if (err) {
            res.send(err)
        } else {
            console.log(editPhoto)
            res.render('photos/edit', {
                photo: editPhoto
            })
        }
    })
})

//update//edits into databse
router.put('/:id', (req, res) => {
Photo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, editedPhoto) => {
    if (err) {
        res.send(err)
    } else {
        console.log(editedPhoto)
        res.redirect('/photos')
    }
})
})

//show
router.get('/:id', (req, res) => {
    Photo.findById(req.params.id, (err, foundPhoto) => {
        if (err) {
            res.send(err)
        } else {
            res.render('./photos/show', {
                photo: foundPhoto
            })
        }
    })
})

//delete
router.delete('/:id', (req, res) => {
    Photo.findByIdAndRemove(req.params.id, (err, deletedImage) => {
        if (err) {
            res.send(err)
        } else {
            console.log(deletedImage)
            res.redirect('/photos')
        }
    })
})

module.exports = router