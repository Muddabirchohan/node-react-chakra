const User = require('../models/user.model.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./../config/database.config');





exports.login = async (req,res) => {
    
  // Our login logic starts here
  try {
    // Get user input
    const { name, password } = req.body;
    // Validate user input
    if (!(name && password)) {
      return res.status(400).send({message: "All input is required"});
    }

    // Validate if user exist in our database
    const user = await User.findOne({ name })
    console.log("user",user)
    if(user){
        const passwordCompared = await bcrypt.compare(password, user.password)
        if (user && passwordCompared) {
          var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: '2h' // expires in 2 hours
          });
          return res.status(200).send({user,token});
        }else {
            console.log("asd")
            return res.status(400).send({message: "Failed To Log in "});

        }
    
    }else {
         console.log("asda")
         return res.status(400).send({
            message: 'User not Found!'
         });

    }


  } catch (err) {
      console.log("eeeee",err)
    res.status(400).send({message : "error log in"});

    console.log(err);
  }


  res.status(400),send("invalid creds")

}




// Create and Save a new user
exports.create = async (req, res) => {


    const {name,description,age,gender,isActive,status,password,image} = req.body;
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }


    encryptedPassword = await bcrypt.hash(password, 10);

    // Create a user
    const user = new User({
        name: req.body.name || "Untitled user", 
        description,
        age,
        gender,
        isActive,
        status,
        password: encryptedPassword,
        image
    });

    // Save user in the database
    user.save()
    .then(data => {
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: '2h' // expires in 2 hours
          });
          data['token'] = token
        // res.send(data);
        res.status(200).send({ data });

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
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
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
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
    if(!req.body.content) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        title: req.body.title || "Untitled user",
        content: req.body.content
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
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
    console.log("params",req.params)
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).json({
                message: "user not found with id " + req.params.userId
            });
        }
        res.status(200).json({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).json({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};