import {
  HTTP_STATUS,
  UNCATEGORY_ID,
  UNSUBCATEGORY_ID,
} from "../utils/constant.js";

import {
  sendError,
  sendWarning,
  sendConflict,
  sendNotFound,
} from "../utils/response.js";

import Category from "../models/category.model.js";
import Subcategory from "../models/subcategory.model.js";
import Product from "../models/product.model.js";

//get all category
export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategory");
    if (!categories) return sendWarning(res, "Get all category failed");
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      categories,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//get all category
export const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findById(categoryId).populate(
      "subcategory"
    );
    if (!category) return sendWarning(res, "Get category failed");
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      category,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//Add category
export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    //Check category exist
    const isCategoryExist = await Category.find({ name: name });
    if (isCategoryExist.length !== 0)
      return sendConflict(res, "Category name already exist");

    const newCategory = await (
      await Category.create({ name })
    ).populate("subcategory");
    if (!newCategory) return sendWarning(res, "Add category failed");

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      category: newCategory,
    });
  } catch (error) {
    sendError(res, error);
  }
};

export const createSubcategory = async (req, res) => {
  const { name, categoryId } = req.body;
  try {
    //Check subcategory name exist
    const isSubcategoryExist = await Subcategory.find({ name: name });
    if (isSubcategoryExist.length !== 0)
      return sendConflict(res, "Subcategory name already exist");

    //create new subcategory
    const newSubcategory = await Subcategory.create({ name });
    if (!newSubcategory) return sendWarning(res, "Add subcategory failed");

    //add subcategory to category
    const newCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        $push: {
          subcategory: newSubcategory._id,
        },
      },
      { new: true }
    ).populate("subcategory");

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      subcategory: newSubcategory,
      category: newCategory,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//update category
export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;

  const { name } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: {
          name,
        },
      },
      { new: true }
    ).populate("subcategory");

    if (!updatedCategory) return sendWarning(res, "Update category failed");

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      category: updatedCategory,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//update subcategory
export const updateSubcategory = async (req, res) => {
  const { subcategoryId } = req.params;
  const { name } = req.body;
  try {
    //Check category exist
    const isSubcategoryExist = await Subcategory.find({ name: name });
    if (isSubcategoryExist.length !== 0)
      return sendConflict(res, "Subcategory name already exist");

    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      {
        $set: {
          name,
        },
      },
      { new: true }
    );

    if (!updatedSubcategory)
      return sendWarning(res, "Update subcategory failed");

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      subcategory: updatedSubcategory,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//delete category
export const deleteSubcategory = async (req, res) => {
  const { subcategoryId } = req.params;
  try {
    //update all product had subCategory to uncategory
    const response = await Product.updateMany(
      { subcategory: subcategoryId },
      {
        $set: {
          subcategory: UNSUBCATEGORY_ID,
        },
      }
    );

    //Delete category
    const deletedSubcategory = await Subcategory.findByIdAndDelete(
      subcategoryId
    );
    if (!deletedSubcategory)
      return sendWarning(res, "Delete subcategory failed");
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      message: "Delete subcategory successfully",
    });
  } catch (error) {
    sendError(res, error);
  }
};

//delete subcategory
export const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  const currentCategory = await Category.findById(categoryId).populate(
    "subcategory"
  );
  if (!currentCategory) return sendWarning(res, "Category not found");
  const { subcategory } = currentCategory;
  try {
    //update all product had subCategory to uncategory
    subcategory.forEach(async (item) => {
      await Product.updateMany(
        { subcategory: item._id },
        {
          $set: {
            subcategory: UNSUBCATEGORY_ID,
          },
        }
      );
    });

    //Delete category
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) return sendWarning(res, "Delete category failed");
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      message: "Delete category successfully",
    });
  } catch (error) {
    sendError(res, error);
  }
};
