const Post = require('../models/post.model.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./../config/database.config');






// Create and Save a new post
exports.create = async (req, res) => {


    const { name, description, isActive, status, image,userId } = req.body;
    // Validate request
    console.log("req",req.body)

    if (!name || !description  || !image || !userId) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }
    // Create a user
    const post = new Post({
        name: name || "Untitled post",
        userId,
        description,
        isActive,
        status,
        image
    });

    // Save user in the database
    post.save()
        .then(data => {
            res.status(200).send({ data });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the post."
            });
        });
};





exports.findAllPostsOfUser = (req, res) => {
    Post.find({userId: req.params.userId},{_id: 0})
        .then(post => {
            res.send(post);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving post."
            });
        });
};




exports.findAll = (req, res) => {
    User.find()
        .then(user => {
            res.send(user);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        });
};


// Find a single note with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        title: req.body.title || "Untitled user",
        content: req.body.content
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.userId
            });
        });
};



// Delete a note with the specified userId in the request
exports.delete = (req, res) => {
    console.log("params", req.params)
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send({ message: "user deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
};