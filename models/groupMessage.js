import mongoose from "mongoose";
const whatsappSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  sender: String,
  groupId: String,
});
export default mongoose.model("groupMessage", whatsappSchema);
