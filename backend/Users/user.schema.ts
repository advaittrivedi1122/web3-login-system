const { mongoose } = require('mongoose');

export interface UserInterface {
    username: String,
    email: String,
    phone: String,
    walletAddress: String,
    password: String,
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"],
    },
    email: {
        type: String,
        required: [true, "Please add the contact email"],
        unique: [true, "Email-address already registered. Please use new Email!!"],
    },
    phone: {
        type: String,
        required: false,
        unique: [true, "Phone Number already registered. Please use new Number!!"],
    },
    walletAddress: {
        type: String,
        required: false,
        unique: [true, "Wallet-address already present. Please use new Wallet-Address!!"],
    },
    password: {
        type: String,
        required: [true, "Please add the password"],
    },
},
    {
        timestamps: true,
    }
);

export const UserSchema = mongoose.model("User", userSchema);
