import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/customer/customer.route';
import { OrderRoutes } from './app/modules/order/order.route';
import { HomeRoutes } from './app/modules/home/home.route';

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use('/', HomeRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/users', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  //res.send('HELLO');
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Shuvos laddu',
  });
});
export default app;
