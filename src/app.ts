import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/Product/product.route';
import { OrderRoutes } from './app/modules/Order/order.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.status(200).send(a.toString());
};

app.get('/', getAController);
app.get('/:id', getAController);

export default app;
