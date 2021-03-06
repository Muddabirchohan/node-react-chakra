module.exports = (app) => {
    const users = require('./../controllers/user.controller.js');

    // Create a new Note
    app.post('/users', users.create);

    //login user
    app.post('/login',users.login)

    // Retrieve all users
    app.get('/users', users.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/:userId', users.findOne);

    // Update a Note with userId
    app.put('/users/:userId', users.update);

    // Delete a Note with userId
    app.delete('/users/:userId', users.delete);
}