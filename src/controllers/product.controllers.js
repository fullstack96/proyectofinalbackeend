import { ProductsModel } from "../daos/mongodb/models/product.model.js";
import ProductsManager from "../daos/mongodb/product.dao.js";
import * as service from '../services/products.services.js';

const ProdManager = new ProductsManager(ProductsModel);

export const createFileProducts = async (req, res, next) => {
    try {
        const newProducts = await service.createFileProducts();
        if (!newProducts){
            res.status(404).json({ msg: "Error create product"});
        } else {
            res.json(`${newProducts} Productos insertados correctamente`);
        } 
    } catch (error) {
        next(error);
    }
}

export const getAllProducts = async (req, res, next) => {
    try {
        const { page, limit, title, sort } = req.query;
        const response = await ProdManager.getAll(page, limit, title, sort);
        
        const nextLink = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null;
        const prevLink = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null;
        res.status(200).json({
          status: 'success',
          payload: response.docs,
          totalPages: response.totalPages,
          prevPage: response.prevPage,
          nextPage: response.nextPage,
          page,
          hasNextPage: response.hasNextPage,
          hasPrevPage: response.hasPrevPage,
          prevLink,
          nextLink,
          totalProducts: response.totalDocs,
          limit: response.limit,
          pagingCounter: response.pagingCounter
        });
    } catch (error) {
        console.log(error)  
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await ProdManager.getById(id);
        if (!product) {
            res.status(404).json({ msg: 'Product not found' });
        } else {
            res.json(product);
        }
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const price = parseInt(req.body.price);
        const stock = parseInt(req.body.stock);        
        if(
            req.body.title && 
            req.body.code && 
            req.body.description && 
            req.body.category && 
            price && 
            stock && 
            req.body.title.length > 0 && 
            req.body.code.length > 0 && 
            req.body.description.length > 0 && 
            req.body.category.length > 0 && 
            price > 0 && 
            stock > 0){
            const newProduct = await ProdManager.create(req.body);
            res.status(201).json(newProduct);
        } else {
            res.status(400).json({ msg: 'Data missing -> title || code || description || price || stock || category' });
        }
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await ProdManager.update(id, req.body);
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProdManager.delete(id);
        res.json(deletedProduct);
    } catch (error) {
        next(error);
    }
};



