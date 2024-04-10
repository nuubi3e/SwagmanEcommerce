import { Document, Types } from 'mongoose';
import { ICategorySchema, IProductSchema } from '../types/schema.types';
import { ActionResponse, Response } from '../response';
import { connectToDB } from './db';
import { CategoryModel } from '../schemas/category.schema';
import ProductModel from '../schemas/product.schema';
import { Log } from '../logs';

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

// ------- PRODUCTS --------------------

type Product = IProductSchema & {
  _id: Types.ObjectId;
};

interface ProductResponse {
  length: number;
  products: Product[];
}

export const getProducts: (
  category?: string
) => Promise<ActionResponse<ProductResponse>> = async (category) => {
  try {
    await connectToDB();
    console.clear();

    console.log(category);
    const cat = await CategoryModel.findOne({ name: category });

    console.log(cat);

    let products: (Document<unknown, {}, IProductSchema> &
      IProductSchema & {
        _id: Types.ObjectId;
      })[] = [];

    if (cat) {
      Log.log('I IF', cat);
      products = await ProductModel.find({
        categoryId: cat._id.toString(),
      })
        .sort({ createdAt: -1 })
        .select('-__v');

      Log.log('IN IF PRD', products);
    } else {
      products = await ProductModel.find()
        .sort({ createdAt: -1 })
        .select('-__v');
    }

    const response = Response.success<ProductResponse>({
      message: 'Products Selected Successfully',
      data: {
        length: products.length,
        products,
      },
      statusCode: 200,
    });

    return response;
  } catch (err) {
    const error = Response.error(err);
    return error;
  }
};
