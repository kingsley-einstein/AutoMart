import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import {
  UserController, CarController, OrderController, FlagController
} from './controllers';
import { TokenExtractor } from './helpers';
import swaggerDoc from './docs/swagger.json';

const router = Router();
// const file = upload();
const extractor = new TokenExtractor();

const userController = new UserController();
const carController = new CarController();
const orderController = new OrderController();
const flagController = new FlagController();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'You have reached the AutoMart API'
  });
});

router.use('/', serve);
router.get('/docs', setup(swaggerDoc));

// User specific routes
router.post('/auth/signup', userController.create);
router.post('/auth/signin', userController.login);
router.get('/auth/token', extractor.extractTokenFromHeader, userController.getUserByToken);
router.get('/users', extractor.extractTokenFromHeader, userController.getAllUsers);
router.get('/users/:user_id', extractor.extractTokenFromHeader, userController.getUser);

// Car specific routes
router.post('/car', extractor.extractTokenFromHeader, carController.create);
router.patch('/car/:car_id/status', extractor.extractTokenFromHeader, carController.markSold);
router.patch('/car/:car_id/price', extractor.extractTokenFromHeader, carController.updatePrice);
router.get('/car/:car_id', extractor.extractTokenFromHeader, carController.getCar);
router.get('/cars/:user_id/count', extractor.extractTokenFromHeader, carController.count);
router.get('/cars/:user_id/all', extractor.extractTokenFromHeader, carController.getCarsByUser);
router.get(
  '/car',
  extractor.extractTokenFromHeader,
  carController.getCars
);
router.delete('/car/:car_id', extractor.extractTokenFromHeader, carController.deleteCar);

// Order specific routes
router.post('/order', extractor.extractTokenFromHeader, orderController.create);
router.get('/order/:order_id', extractor.extractTokenFromHeader, orderController.getOrderById);
router.get(
  '/orders/:seller_id/seller',
  extractor.extractTokenFromHeader,
  orderController.getOrdersBySeller
);
router.get(
  '/orders/:user_id/buyer',
  extractor.extractTokenFromHeader,
  orderController.getOrdersByUser
);
router.get('/orders/:user_id/count', extractor.extractTokenFromHeader, orderController.count);
router.get(
  '/orders/:seller_id/seller/count',
  extractor.extractTokenFromHeader,
  orderController.countBySeller
);
router.patch(
  '/order/:order_id/price',
  extractor.extractTokenFromHeader,
  orderController.updatePrice
);
router.patch(
  '/order/:order_id/status',
  extractor.extractTokenFromHeader,
  orderController.updateStatus
);

// Flag specific routes
router.post('/flag', extractor.extractTokenFromHeader, flagController.create);
router.get('/flag', extractor.extractTokenFromHeader, flagController.getAllFlags);
router.get('/flag/:flag_id', extractor.extractTokenFromHeader, flagController.getFlag);
router.delete('/flag/:flag_id', extractor.extractTokenFromHeader, flagController.deleteFlag);

export default router;
