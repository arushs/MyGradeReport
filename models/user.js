/*
 * @author Rukmal Weerawarana
 *
 * @description Mongoose configuration for application.
 */

'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePasswords = function(candidatePassword) {
    bcrypt.compare(candidatePassword, this.password, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            console.log('middle');
            return true;
            // FIX THIS
            // Try a double return
        }
    });
};

module.exports = mongoose.model('User', userSchema);
