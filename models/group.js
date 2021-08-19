import mongoose from "mongoose";
const groupSchema = mongoose.Schema({
  groupName:String,
  groupProfile:String,
  admin:String,
  createdDate:String,
  members:Array,
});
export default mongoose.model("groups", groupSchema);
