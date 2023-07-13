const CategoryModel = require("../models/CategoryModel");
const SubcategoryModel = require("../models/SubcategoryModel");

const subcategoryRepo = {
  async addsubCategory(subcategoryData, filePath) {
    try {
      //   console.log(categoryData, filePath);

      const subcategory = new SubcategoryModel({
        category_id: subcategoryData.category_id,
        name: subcategoryData.name,
        desc: subcategoryData.desc,
        image: filePath,
      });

      const savedData = await subcategory.save();
      // console.log(savedData)/

      const updateSub = await CategoryModel.findByIdAndUpdate(
        { _id: savedData.category_id },
        {
          $push: {
            subcategory: {
              subcategory: savedData._id,
            },
          },
        },
        { new: true, useFindAndModify: false }
      );

      return savedData;
      // console.log(updateSub);/
    } catch (error) {
      console.log(error);
    }
  },

  async getsubCategory() {
    try {
      return (subcategoryData = await SubcategoryModel.find({
        isEnabled: true,
      }).populate("category_id", "name"));
    } catch (error) {
      console.log(error);
    }
  },

  async editsubCategory(id) {
    try {
      return (subcategoryData = await SubcategoryModel.find({
        _id: id,
        isEnabled: true,
      }).populate("category_id", "name"));
    } catch (error) {
      console.log(error);
    }
  },
  async updatesubCategory(data, filePath) {
    try {
      //   console.log(data);
      //   console.log(filePath);

      return (updateData = await SubcategoryModel.findByIdAndUpdate(
        { _id: data.id },
        {
          category_id: data.category_id,
          name: data.name,
          desc: data.desc,
          image: filePath,
          isEnabled: data.status,
        },
        {
          new: true,
        }
      ));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = subcategoryRepo;
