const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
if (process.env.NODE_ENV !== 'production') require('../../../secrets')
var twilio = require('twilio')
var client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    }
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: 'https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg'
  },
  phone: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  address: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,

    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
},
{
  hooks: {
    beforeUpdate: user => {
      user.firstName = `${user.firstName[0].toUpperCase()}${user.firstName.slice(
        1
      )}`
      user.lastName = `${user.lastName[0].toUpperCase()}${user.lastName.slice(
        1
      )}`
    }
  }
})

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
};

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
};

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
};

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)


User.prototype.sendNotifications = function(coordinatorName) {

  client.messages
    .create({
      body: `You've been invited by ${coordinatorName} to go on an adventure! Log in to see your adventure now: http://localhost:3000`,
      to: this.phone,
      from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
    })
    .then(message => console.log(message.sid))
    .done()
}

User.prototype.sendPollCompleteNotification = function(){
  client.messages
    .create({
      body: `The poll has been completed and results are ready to view: http://localhost:3000`,
      to: this.phone,
      from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
    })
    .then(message => console.log(message.sid))
    .done()
}

module.exports = User
