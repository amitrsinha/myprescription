const UserModel = require("./usersModel");

module.exports = {
    addUser: async (userData, res) => {
        try {
            const userObj = UserModel.build(userData);
            if (userObj.validateUser()) {
                console.log('Validated');
                await userObj.save();
                console.log(userObj.getId());
                if(userObj.getId()) {
                    res.send('Data saved!!!');
                    console.log('after save');
                }
            } else {
                console.log('Not Validated');
                res.send('Data coultn\'t saved!!!');
            }
        } catch (error) {
            console.log("*********************");
            console.log(error);
            res.send('Data coultn\'t saved!!!');
        }

    }
}
