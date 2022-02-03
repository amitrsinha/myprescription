const User = require("../models/users/users");
console.log('in user routes');
module.exports = app => {
    app.post('/myprescription/user/new', (req, res) => {
        User.addUser(req.body, res);
    });

    app.get('/myprescription/user/:id', async (req, res) => {
        console.log('Get User');
    });

    app.get('/myprescription/users', async (req, res) => {
        console.log('Get All User');
    });
}
