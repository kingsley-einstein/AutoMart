import { Router } from 'express';
import { UserController, CarController } from './controllers';

const router = Router();

const userController = new UserController();
const carController = new CarController();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'You have reached the AutoMart API'
  });
});

// User specific routes
router.post('/auth/signup', userController.create);
router.post('/auth/signin', userController.login);

// Car specific routes
router.post('/car', carController.create);
router.patch('/car/:car_id/status', carController.markSold);
router.patch('/car/:car_id/price', carController.updatePrice);
router.get('/car/:car_id', carController.getCar);
router.get('/car', carController.getCarsByStatusOrBodyType);
router.delete('/car/:car_id', carController.deleteCar);

export default router;
