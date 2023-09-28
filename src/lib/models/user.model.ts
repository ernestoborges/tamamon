import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        require: [true, "Username is required"],
        minLength: [3, "Username should be atleast 3 characters long"],
        maxLength: [20, "Username should be less than 20 characters"],
        match: [/^[a-zA-Z0-9_]+$/, "Username should only be A to Z letters and 0-9 numbers"]
    },
    email: {
        type: String,
        unique: true,
        require: [true, "Email is required"],
        match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Email format is invalid"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    pokemons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pokemon',
        }
    ],
    buddy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokemon',
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
},
    { timestamps: true }
)

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;