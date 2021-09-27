const { Schema, model, Types } = require('mongoose');
const User = Model('User', UserSchema);

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'username is required',
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

module.exports = User;