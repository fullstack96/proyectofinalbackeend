import express from 'express';
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import morgan from 'morgan';
import colors from 'colors/safe.js';
import getLocalIpAndDataOs from './getIp.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { initMongoDB } from './daos/mongodb/connection.js';

import __dirname from './utils.js';
console.log(__dirname)


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); 

app.use('/products', productsRouter);
app.use('/carts', cartRouter);
app.use('/', productsRouter);

app.use(errorHandler);

initMongoDB()

const IP = getLocalIpAndDataOs();
const PORT = 8080;

app.listen(PORT, () => console.log(colors.yellow("Server running on ip + port:"), colors.magenta(`http://${IP}:${PORT}`)) )
 

 
