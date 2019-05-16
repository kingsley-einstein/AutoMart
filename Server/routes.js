import { Router } from 'express';
import { UserController } from './controllers';

const router = Router();

const userController = new UserController();

router.get("/", (req, res) => {
    res.status(200).json({
      message: "You have reached the AutoMart API"
    });
});

router.post("/auth/signup", userController.create);
router.post("/auth/signin", userController.login);

export default router;