import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { productValidationSchema } from './product.validation';
import { z } from 'zod';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    const productParsedData = productValidationSchema.parse(productData);
    const result = await ProductServices.createProductIntoDB(productParsedData);

    res.status(200).json({
      success: true,
      message: 'Product is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed',
      error: err.message,
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();

    res.status(200).json({
      success: true,
      message: 'Products are retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed',
      error: err.message,
    });
  }
};

const getAProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getAProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Products is retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed',
      error: err.message,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    const productParsedData = productValidationSchema.parse(productData);
    const result = await ProductServices.updateProductInDB(
      productId,
      productParsedData,
    );

    res.status(200).json({
      success: true,
      message: 'Products updated successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed',
      error: err.message,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await ProductServices.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Deleted successfully',
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed',
      error: err.message,
    });
  }
};

const searchProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await ProductServices.searchProductInDB(searchTerm);

    res.status(200).json({
      success: true,
      message: 'Search Product found successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed',
      error: err.message,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getAProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
