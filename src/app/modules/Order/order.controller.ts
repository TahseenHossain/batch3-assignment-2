import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { orderValidationSchema } from './order.validation';
import { Types } from 'mongoose';

const createOrder = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const orderParsedData = orderValidationSchema.parse(productData);
    const orderDataWithObjectId = {
      ...orderParsedData,
      productId: new Types.ObjectId(orderParsedData.productId),
    };
    const result = await OrderServices.createOrderIntoDB(orderDataWithObjectId);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    if (err.message === 'Product not Found') {
      res.status(404).json({
        success: false,
        message: 'Product not Found',
        error: err.message,
      });
    } else if (err.message === 'Product not Available') {
      res.status(400).json({
        success: false,
        message: 'Product not Available',
        error: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed',
        error: err.message,
      });
    }
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;
    let result;
    if (!email) {
      result = await OrderServices.getAllOrdersFromDB();
    } else {
      result = await OrderServices.searchOrderByEmailFromDB(email);
    }
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
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

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
