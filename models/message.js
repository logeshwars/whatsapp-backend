import mongoose from "mongoose";
const whatsappSchema=mongoose.Schema({
     message:String,
     name:String,
     timestamp:String,
     receiver:String,
     sender:String,
});
export default mongoose.model('messageContent',whatsappSchema)