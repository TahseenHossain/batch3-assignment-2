import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getAProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const updateProductInDB = async (id: string, productData: Product) => {
  const result = await ProductModel.findByIdAndUpdate(id, productData, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  await ProductModel.findByIdAndDelete(id);
};

const searchProductInDB = async (searchTerm: string) => {
  const result = await ProductModel.find({
    $or: [{ name: { $regex: searchTerm, $options: 'i' } }],
  });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getAProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
  searchProductInDB,
};
