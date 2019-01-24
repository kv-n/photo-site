const express = require('express')
const router = express.Router()
//model data goes here
const Photo = require('../models/photos')
const User = require('../models/users')


//ROUTES

//index
router.get('/', (req, res) => {
    User.find({}, (err, allUsers) => {
        res.render('photos/index', {
            users: allUsers
        })
    })

    // Photo.find({}, (err, allPhotos) => {
    //     if (err) {
    //         res.send(err)
    //     } else {
    //         res.render("photos/index", {
    //             photos: allPhotos
    //         })
    //     }
    // })
})

//new route//rendering create form
router.get('/new', (req, res) => {
  User.find({}, (err, allUsers) => {
      res.render('photos/new', {
          users: allUsers
      })
  })

})


//create route //create in our database
router.post('/', (req, res) => {
    User.findById(req.body.userId, (err, foundUser) => {
        Photo.create(req.body, (err, createdPhoto) => {
            if(err) {
                res.send(err)
            } else {
                foundUser.photo.push(createdPhoto);
                foundUser.save((err, data) => {
                    res.redirect('/photos')
                })
            }
        })
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
        User.findOne({'photo._id': req.params.id}, (err, foundUser) => {
            foundUser.photo.id(req.params.id).remove()
            foundUser.save((err, data) => {
                if (err){
                    res.send(err)
                } else {
                    console.log(deletedImage)
                    res.redirect('/photos')
                }
            })


        })
    })
})

module.exports = router