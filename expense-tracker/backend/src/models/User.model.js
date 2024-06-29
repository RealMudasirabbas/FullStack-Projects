import mongoose ,{Schema} from "mongoose"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: [5,"username must be atleast 5 characters long"],
        maxLength: [50,"username must not exceed over 50 characters"]
    },
    email: {
        
        type: String,
        required: true,
        trim: true,
        unique: true,
        
    },

    password:{
        type: String,
        required: true,
        trim: true,
        minLength: [8,"password must be atleast 5 characters long"],
        maxLength: [25,"password must not exceed over 50 characters"]
    },


},{
    timestamps: true

})

export const userModel = mongoose.model("User",userSchema)