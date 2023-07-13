const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },

    subcategory: [
      {
        subcategory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subcategory",
        },
      },
    ],

    isEnabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
