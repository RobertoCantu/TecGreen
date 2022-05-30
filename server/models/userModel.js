import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required:true
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    }
  },
  {
    timestamps: true,
  }
);

// Decrypt password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Compare the password from the db and the entered password from the user
  return await bcrypt.compare(enteredPassword, this.password);
};

// Before saving on db encrypt user password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
