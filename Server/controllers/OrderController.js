import { orderTable } from '../models';
import { associations } from '../helpers';

export default class OrderController {
  async create(req, res) {
    try {
      const { body } = req;
      const order = await orderTable.create(body);
      await associations.order_car(order);
      await associations.order_user(order);

      res.status(200).json({
        status: 200,
        data: order
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
      const { order_id } = req.params;
      const { price } = req.query || req.body;
      
    } catch(err) {}
  }
}
