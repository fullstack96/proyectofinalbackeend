import mongoose from "mongoose";
import colors from 'colors';
import 'dotenv/config'

const MONGO_URL = process.env.MONGO_URL

export const initMongoDB = async () => {
    try {
        const conexion = await mongoose.connect(MONGO_URL);
        console.log(colors.green.italic.underline(conexion.connection.host) + colors.yellow(' >>> Base de datos conectada a MongoDB'));
    } catch (error) {
        console.log(error)
    }
}