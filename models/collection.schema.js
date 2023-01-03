import mongoose from "mongoose";

const CollectionSchema = mongoose(
  {
    name: {
      type: String,
      required: [true, "Pease provide a product name"],
      trim: true,
      maxLength: [
        120,
        "Collection name should not be more then 120 Characters",
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Collection", CollectionSchema);
