import mongoose, { Schema, Document } from "mongoose";


export interface User extends Document {
    username: string,
    email: string,
    password: string,
    plotes: {
        type: mongoose.Schema.Types.ObjectId[],
        
    }
}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "User is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please use valid email"]

    },
    password: {
        type: String,
    },
    plotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plote"
        }
    ]
});

const userModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);
export default userModel