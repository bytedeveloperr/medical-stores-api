import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;

const storeSchema = new Schema({
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
  stores: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  
  },
  
});

// Encrypt password using bcrypt

export default  mongoose.model("store", storeSchema);
