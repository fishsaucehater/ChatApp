const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must have name']
    },
    username: {
        type: String,
        required: [true, 'Must have username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Must have password'],
        minlength: 8
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Must have email'],
        validate: [validator.isEmail, 'please enter correct email']
    },
    avatar: {
		type: String
	}, 
    friends: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: [],
	}
});


userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;