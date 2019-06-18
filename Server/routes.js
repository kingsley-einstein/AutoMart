import { Router } from 'express';
// import { serve, setup } from 'swagger-ui-express';
import { UserController } from './controllers';
import { TokenExtractor } from './helpers';
// import swaggerDoc from './docs/swagger.json';

const router = Router();
// const file = upload();
const extractor = new TokenExtractor();

const userController = new UserController();
// const carController = new CarController();
// const orderController = new OrderController();
// const flagController = new FlagController();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'You have reached the AutoMart API'
  });
});

// router.use('/', serve);
// router.get('/docs', setup(swaggerDoc));

// User specific routes
router.post('/auth/signup', userController.create);
router.post('/auth/signin', userController.login);
router.get('/auth/token', extractor.extractTokenFromHeader, userController.getUserByToken);
router.get('/users', extractor.extractTokenFromHeader, userController.getAllUsers);
router.get('/users/:user_id', extractor.extractTokenFromHeader, userController.getUser);

// Car specific routes
// router.post('/car', file.single('picture'), carController.create);
// router.patch('/car/:car_id/status', carController.markSold);
// router.patch('/car/:car_id/price', carController.updatePrice);
// router.get('/car/:car_id', carController.getCar);
// router.get('/cars/:user_id/count', carController.count);
// router.get('/cars/:user_id/all', carController.getCarsByUser);
// router.get('/car', carController.getCarsByStatusOrBodyType.bind(carController));
// router.delete('/car/:car_id', carController.deleteCar);

// Order specific routes
// router.post('/order', orderController.create);
// router.get('/order/:order_id', orderController.getOrderById);
// router.get('/orders/:seller_id/seller', orderController.getOrdersBySeller);
// router.get('/orders/:user_id/buyer', orderController.getOrdersByUser);
// router.get('/orders/:user_id/count', orderController.count);
// router.get('/orders/:seller_id/seller/count', orderController.countBySeller);
// router.patch('/order/:order_id/price', orderController.updatePrice);
// router.patch('/order/:order_id/status', orderController.updateStatus);

// Flag specific routes
// router.post('/flag', flagController.create);
// router.get('/flag', flagController.getAllFlags);
// router.get('/flag/:flag_id', flagController.getFlag);
// router.delete('/flag/:flag_id', flagController.deleteFlag);

export default router;
