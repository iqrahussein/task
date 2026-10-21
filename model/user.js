import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const bookSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role:{
    type:String,
    enum:['admin','user'],
    default:"user"
  }
});

// Pre-save hook: Hash password before saving
bookSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
 
});

// Instance method: Compare input password with hashed password
bookSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const user = mongoose.model("book", bookSchema);

export default user;
