import mongoose from 'mongoose'

const FriendshipSchema = new mongoose.Schema({

    user1: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',

    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
},
    { timestamps: true }
)

const Friendship = mongoose.models.Friendship || mongoose.model('Friendship', FriendshipSchema);

export default Friendship;