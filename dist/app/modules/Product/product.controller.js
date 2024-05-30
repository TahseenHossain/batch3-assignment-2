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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: productData } = req.body;
        const productParsedData = product_validation_1.productValidationSchema.parse(productData);
        const result = yield product_service_1.ProductServices.createProductIntoDB(productParsedData);
        res.status(200).json({
            success: true,
            message: 'Product is created successfully',
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
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductServices.getAllProductsFromDB();
        res.status(200).json({
            success: true,
            message: 'Products are retrieved successfully',
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
const getAProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getAProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Products is retrieved successfully',
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
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productData = req.body;
        const productParsedData = product_validation_1.productValidationSchema.parse(productData);
        const result = yield product_service_1.ProductServices.updateProductInDB(productId, productParsedData);
        res.status(200).json({
            success: true,
            message: 'Products updated successfully',
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
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield product_service_1.ProductServices.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Deleted successfully',
            data: null,
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
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductServices.searchProductInDB(searchTerm);
        res.status(200).json({
            success: true,
            message: 'Search Product found successfully',
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
exports.ProductControllers = {
    createProduct,
    getAllProduct,
    getAProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
};
