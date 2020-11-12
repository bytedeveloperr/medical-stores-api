import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },

  
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
    // unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
  
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  
});

// Encrypt password using bcrypt

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

export default  mongoose.model("User", UserSchema);
