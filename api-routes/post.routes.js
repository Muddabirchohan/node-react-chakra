const Auth = require('../auth/Auth.js');

module.exports = (app) => {
    const posts = require('./../controllers/post.controller.js');

    // Create a new Note
    app.post('/posts', Auth, posts.create);

    // Find All Posts of a Specific User
    app.get('/posts/:userId', Auth, posts.findAllPostsOfUser);

    // //login user
    // app.post('/login',users.login)

    // // Retrieve all users
    // app.get('/users', users.findAll);

    // // Retrieve a single Note with noteId
    // app.get('/users/:userId', users.findOne);

    // // Update a Note with userId
    // app.put('/users/:userId', users.update);

    // // Delete a Note with userId
    // app.delete('/users/:userId', users.delete);
}