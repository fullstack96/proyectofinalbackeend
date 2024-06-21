import { ProductsModel } from './models/product.model.js'


export default class ProductsDaoMongoDB {

    async getAll(page = 1, limit = 10, title, sort) {
        try {
            const filter = title ? { 'title': title } : {};
            let sortOrder = {};
            if(sort) sortOrder.price = sort === 'asc' ?  1 : sort === 'desc' ? -1 : null;
            // {price: 1}
            const response = await ProductsModel.paginate(filter, { page, limit, sort: sortOrder});
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            return await ProductsModel.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async create(obj) {

        try {
            const product = {
                status: true,
                ...obj
            };
            return await ProductsModel.create(product);
        } catch (error) {
            throw new Error(error);
        }
    }

    async createMassive(obj) {
        try {        
            return await ProductsModel.create(obj);
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(id, obj) {
        try {
            return await ProductsModel.findByIdAndUpdate(id, obj);
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id) {
        try {
            return await ProductsModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error);
        }
    }

}