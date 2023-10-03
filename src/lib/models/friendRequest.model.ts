import mongoose from 'mongoose'

const FriendRequestSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',

    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    pending: {
        type: Boolean,
        required: true,
    },
},
    { timestamps: true }
)

const FriendRequest = mongoose.models.FriendRequest || mongoose.model('FriendRequest', FriendRequestSchema);

export default FriendRequest;