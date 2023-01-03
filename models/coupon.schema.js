import mongoose from "mongoose";

const CouponSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Please provide a coupon name"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    active: {
      type: Number,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Coupon", CouponSchema);
