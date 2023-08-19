import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
   {
     title: { type: String, required: true},
     description: { type: String, required: true },
     date: {type: Date, default: Date.now },
     image: {type: String},
     user: {type: mongoose.Types.ObjectId, ref: "User"},
   },
   {
    timestamps: true,
   }
    
);

export default mongoose.model("publication", productSchema);
