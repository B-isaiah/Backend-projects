import mongoose,{Schema} from "mongoose";  
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            minlength:3,
            maxlength:20
        },
        password:{
            type:String,
            required:true,
            trim:true,
            minlength:8,
            maxlength:100
        },

        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },

        refreshToken: {
    type: String
}

    },

    {
        timestamps:true,
    
    },
)

// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) 
        return bcrypt.hash(this.password, 10);

});

//compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };
