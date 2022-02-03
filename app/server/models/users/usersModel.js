const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../../config/database");
const validator = require("../../services/validationService");

class UserModel extends Model { 

    getId() {
        return this.id;
    }

    getFullName() {
        return [this.firstName, this.lastName].join(' ');
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getMobile() {
        return this.mobile;
    }

    getEmail() {
        return this.email;
    }

    getPin() {
        return this.pin;
    }

    validateUser() {
        validator.validateModel(this);
        return false;
    }
}
UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mobile: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pin: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    imageId: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    modifiedAt: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
},
    {
        sequelize: db,
        modelName: 'users'
    }
);
UserModel.sync();

module.exports = UserModel;
