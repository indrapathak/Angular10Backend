/**
 * Schema for storing user details
 */
const crypto = require('crypto')
let mongoose = require('mongoose')
Schema = mongoose.Schema

//User Schema
const UserSchema = new Schema({
    companyId: {
        type: String,
        unique: false
    },
	userType: {
		type: String,
        unique: false
	
	},

	name: {
		type: String,
		required: false,
        unique: false
	},

	mobile: {
		type: Number,
	    unique: false
	},
	password: {
		type: String,
        unique: false
	},
	
	
	email: {
		type: String,
		required: false,
        unique: false
		
	},
	
}, {
collection: 'user'
});



module.exports = mongoose.model('user', UserSchema);
