const {sequelize, DataTypes} = require("sequelize"); 

module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('user', {
        userId: {
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        name: { 
            type: DataTypes.STRING, 
            allowNull: false
        },
        lastname: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        email: { 
            type: DataTypes.STRING, 
            validate: {isEmail: true}, 
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING, 
            allowNull: false, 
            default: "http://localhost:3066/images/icone-default.jpeg"
        }, 
        description: {
            type: DataTypes.STRING, 
            allowNull: true
        }, 
        admin: {
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            default: false
        }
    }); 
    return User; 
}