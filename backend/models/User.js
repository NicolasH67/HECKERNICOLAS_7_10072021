const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

class User extends Model {}

User.init(
    {
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
    }, 
    {
        sequelize, 
        modelName: 'User'
    }
)