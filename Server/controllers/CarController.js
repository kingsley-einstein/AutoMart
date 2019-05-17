import { carsTable } from '../models'
import { associations } from '../helpers'

export class CarController {
    async create(req, res) {
        try {
            let body = req.body;
            body.owner = req.query.owner;
            body.status = "Available";
            let car = await carsTable.create(body);
            await associations.car_user(car);

            res.status(200).json({
                status: 200,
                data: car
            });
        } catch(err) {
            res.status(500).json({
                status: 500,
                message: err.message
            });
        }
    }

    async markSold(req, res) {
        try {
            let { car_id } = req.params;
            let car = await carsTable.update(car_id, { 
                status: "Sold"
            });
            await associations.car_user(car);

            res.status(200).json({
                status: 200,
                data: car
            })
        } catch (err) {
            res.status(500).json({
                status: 500,
                error: err.message
            });
        }
    }

    async updatePrice(req, res) {
        try {
            let { car_id } = req.params;
            let { price } = req.body;
            let car = await carsTable.update(car_id, {
                price: price
            });
            await associations.car_user(car);

            res.status(200).json({
                status: 200,
                data: car
            });
        } catch(err) {
            res.status(500).json({
                status: 500,
                error: err.message
            });
        }
    }

    async getCar(req, res) {
        try {
            let { car_id } = req.params;
            let car = await carsTable.getCarById(car_id);
            await associations.car_user(car);

            res.status(200).json({
                status: 200,
                data: car
            });
        } catch(err) {
            res.status(500).json({
                status: 500,
                error: err.message
            });
        }
    }

    async getCarsByStatus(req, res) {
        try {
            let { status } = req.query;
            let cars = await carsTable.getCarsByStatus(status);
            cars.forEach( async car => {
                await associations.car_user(car);
            });

            res.status(200).json({
                status: 200,
                data: cars
            });
        } catch(err) {
            res.status(500).json({
                status: 500,
                error: err.message
            });
        }
    }
}