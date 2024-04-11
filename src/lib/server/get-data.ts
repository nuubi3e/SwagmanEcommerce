import { Types } from 'mongoose';
import { ICategorySchema } from '../types/schema.types';
import { ActionResponse, Response } from '../response';
import { connectToDB } from './db';
import { CategoryModel } from '../schemas/category.schema';
export type Category = ICategorySchema & {
  _id: Types.ObjectId;
};

interface CategoryResponse {
  length: number;
  categories: Category[];
}

export const getCategories: (
  search?: string
) => Promise<ActionResponse<CategoryResponse>> = async (searchStr) => {
  try {
    await connectToDB();

    const categories = await CategoryModel.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    const response = Response.success<CategoryResponse>({
      message: 'Categories Selected Successfully',
      data: {
        length: categories.length,
        categories,
      },
      statusCode: 200,
    });

    return response;
  } catch (err) {
    const error = Response.error(err);
    return error;
  }
};
