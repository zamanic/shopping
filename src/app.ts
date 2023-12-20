import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/customer/customer.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();
//const port = 3000;
//parsers
app.use(express.json());
app.use(cors());

//application routes
//to hit /api/users/create-user add create-user at the end
app.use('/api/users', UserRoutes);
app.use('/api/users', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  //res.send('Hello World!');
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Shuvos laddu',
  });
});
export default app;
