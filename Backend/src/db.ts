import mongoose, { model } from "mongoose";


const userSchema= new mongoose.Schema({
 username:{type: String, required:true,unique:true} ,  
 password:{type:String,required:true}
})

const tagSchema = new mongoose.Schema({
    title:{type:String,required:true,unique:true}
});

const contentSchema = new mongoose.Schema({
    link:{type:String},
    type:{type:String},
    title:{type:String},
    tags:[{type:mongoose.Types.ObjectId,ref:'tag'}],
    userId: { type: mongoose.Types.ObjectId, ref: 'user', required: true },

})

const LinkSchema = new mongoose.Schema({
    hash:String,
    userId: { type: mongoose.Types.ObjectId, ref: 'user', required: true ,unique:true},

})
export const linkModel=model("link",LinkSchema);
export const userModel=model("user",userSchema);
export const tagModel=model('tag',tagSchema);
export const contentModel=model('content',contentSchema);

