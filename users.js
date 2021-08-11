import mongoose from "mongoose";
const userSchema = mongoose.Schema({
 user:String,
 profile:String,
 status:String,
});
export default mongoose.model('users', userSchema);
