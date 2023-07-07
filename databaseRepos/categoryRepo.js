const CategoryModel = require("../models/CategoryModel");

const categoryRepo = {
  async addCategory(categoryData, filePath) {
    try {
      //   console.log(categoryData, filePath);

      const category = new CategoryModel({
        name: categoryData.name,
        desc: categoryData.desc,
        image: filePath,
      });

      return (categoryData = await category.save());
    } catch (error) {
      console.log(error);
    }
  },

  async getCategory() {
    try {
      return (catData = await CategoryModel.find({
        isEnabled: true,
      }));
    } catch (error) {
      console.log(error);
    }
  },

  async editCategory(id) {
    try {
      return (categoryData = await CategoryModel.find({
        _id: id,
        isEnabled: true,
      }));
    } catch (error) {
      console.log(error);
    }
  },
  async updateCategory(data,filePath) {
    try {
        // console.log(data)
        // console.log(filePath)

      return updateData = await CategoryModel.findByIdAndUpdate(
        { _id: data.id },
        {
          name: data.name,
          desc: data.desc,
          image: filePath,
          isEnabled:data.status,
        },
        {
          new: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = categoryRepo;
