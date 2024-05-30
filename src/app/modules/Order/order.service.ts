import { Order } from './order.interface';
import { OrderModel } from './order.model';
import { ProductModel } from '../Product/product.model';

const createOrderIntoDB = async (order: Order) => {
  const product = await ProductModel.findById(order.productId);

  if (!product) {
    throw new Error('Product not found');
  }

  if (product.inventory.quantity < order.quantity) {
    throw new Error('Product not Available');
  }

  product.inventory.quantity -= order.quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  const result = await OrderModel.create(order);
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

const searchOrderByEmailFromDB = async (searchEmail: string) => {
  const result = await OrderModel.find({
    $or: [{ email: { $regex: searchEmail, $options: 'i' } }],
  });
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  searchOrderByEmailFromDB,
};
