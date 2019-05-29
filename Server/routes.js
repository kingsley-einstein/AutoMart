import { Router } from 'express';
import {
  UserController, CarController, OrderController, FlagController
} from './controllers';
import { upload } from './helpers';

const router = Router();
const file = upload();

const userController = new UserController();
const carController = new CarController();
const orderController = new OrderController();
const flagController = new FlagController();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'You have reached the AutoMart API'
  });
});

// User specific routes
router.post('/auth/signup', userController.create);
router.post('/auth/signin', userController.login);
router.get('/users', userController.getAllUsers);
router.get('/users/:user_id', userController.getUser);

// Car specific routes
router.post('/car', file.single('picture'), carController.create);
router.patch('/car/:car_id/status', carController.markSold);
router.patch('/car/:car_id/price', carController.updatePrice);
router.get('/car/:car_id', carController.getCar);
router.get('/car', carController.getCarsByStatusOrBodyType.bind(carController));
router.delete('/car/:car_id', carController.deleteCar);

// Order specific routes
router.post('/order', orderController.create);
router.get('/order/:order_id', orderController.getOrderById);
router.patch('/order/:order_id/price', orderController.updatePrice);
router.patch('/order/:order_id/status', orderController.updateStatus);

// Flag specific routes
router.post('/flag', flagController.create);
router.get('/flag', flagController.getAllFlags);
router.get('/flag/:flag_id', flagController.getFlag);
router.delete('/flag/:flag_id', flagController.deleteFlag);

export default router;
