const mongoose = require("mongoose");

subcategorySchema = mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

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
    required: true,
  },

  isEnabled: {
    type: Boolean,
    default: false,
  },
});

const SubcategoryModel = mongoose.model("Subcategory", subcategorySchema);
module.exports = SubcategoryModel;
