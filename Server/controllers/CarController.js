import { carsTable } from '../models';
import { associations } from '../helpers';

export class CarController {
  async create(req, res) {
    try {
      const { body } = req;
      body.owner = req.query.owner;
      body.status = 'Available';
      const car = await carsTable.create(body);
      await associations.car_user(car);

      res.status(200).json({
        status: 200,
        data: car
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message
      });
    }
  }

  async markSold(req, res) {
    try {
      const { car_id } = req.params;
      const car = await carsTable.update(car_id, {
        status: 'Sold'
      });
      await associations.car_user(car);

      res.status(200).json({
        status: 200,
        data: car
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async updatePrice(req, res) {
    try {
      const { car_id } = req.params;
      const { price } = req.body;
      const car = await carsTable.update(car_id, {
        price
      });
      await associations.car_user(car);

      res.status(200).json({
        status: 200,
        data: car
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getCar(req, res) {
    try {
      const { car_id } = req.params;
      const car = await carsTable.getCarById(car_id);
      await associations.car_user(car);

      res.status(200).json({
        status: 200,
        data: car
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getCarsByStatus(req, res) {
    try {
      const { status, min_price, max_price } = req.query;
      let cars = null;
      cars = min_price && max_price
        ? await carsTable.getCarsByStatusAndPriceRange(status, min_price, max_price)
        : await carsTable.getCarsByStatus(status);
      cars.forEach(async (car) => {
        await associations.car_user(car);
      });

      res.status(200).json({
        status: 200,
        data: cars
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async deleteCar(req, res) {
    try {
      const { car_id } = req.params;
      const isDeleted = await carsTable.delete(car_id);
      res.status(200).json({
        status: 200,
        isDeleted
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }
}
