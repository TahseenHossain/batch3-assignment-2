"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
const mongoose_1 = require("mongoose");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const orderParsedData = order_validation_1.orderValidationSchema.parse(productData);
        const orderDataWithObjectId = Object.assign(Object.assign({}, orderParsedData), { productId: new mongoose_1.Types.ObjectId(orderParsedData.productId) });
        const result = yield order_service_1.OrderServices.createOrderIntoDB(orderDataWithObjectId);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (err) {
        if (err.message === 'Product not Found') {
            res.status(404).json({
                success: false,
                message: 'Product not Found',
                error: err.message,
            });
        }
        else if (err.message === 'Product not Available') {
            res.status(400).json({
                success: false,
                message: 'Product not Available',
                error: err.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Failed',
                error: err.message,
            });
        }
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        let result;
        if (!email) {
            result = yield order_service_1.OrderServices.getAllOrdersFromDB();
        }
        else {
            result = yield order_service_1.OrderServices.searchOrderByEmailFromDB(email);
        }
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed',
            error: err.message,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};
