// import { orderTable } from '../models';
// import { associations } from '../helpers';

// export class OrderController {
//   async create(req, res) {
//     try {
//       const { body } = req;
//       body.status = 'Pending';
//       const order = await orderTable.create(body);
//       await associations.order_car(order);
//       await associations.order_user(order);

//       res.status(200).json({
//         status: 200,
//         data: order
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: 500,
//         error: err.message
//       });
//     }
//   }

//   async getOrderById(req, res) {
//     try {
//       const { order_id } = req.params;
//       const order = await orderTable.getOrderById(order_id);
//       await associations.order_car(order);
//       await associations.order_user(order);

//       res.status(200).json({
//         status: 200,
//         data: order
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: 500,
//         error: err.message
//       });
//     }
//   }

//   async getOrdersByUser(req, res) {
//     try {
//       const { user_id } = req.params;
//       const orders = await orderTable.getOrdersByBuyer(user_id);
//       orders.forEach(async (value) => {
//         await associations.order_car(value);
//         await associations.order_user(value);
//       });

//       res.status(200).json({
//         status: 200,
//         data: orders
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: 500,
//         error: err.message
//       });
//     }
//   }

//   async getOrdersBySeller(req, res) {
//     try {
//       const { seller_id } = req.params;
//       const orders = await orderTable.getOrdersBySeller(seller_id);

//       res.status(200).json({
//         status: 200,
//         data: orders
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: 500,
//         error: err.message
//       });
//     }
//   }

//   async updatePrice(req, res) {
//     try {
//       const { order_id } = req.params;
//       const { price } = req.body;
//       const order = await orderTable.update(order_id, { price });
//       await associations.order_car(order);
//       await associations.order_user(order);

//       res.status(200).json({
//         status: 200,
//         data: order
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: 500,
//         error: err.message
//       });
//     }
//   }

//   async updateStatus(req, res) {
//     try {
//       const { order_id } = req.params;
//       const { status } = req.body;
//       const order = await orderTable.update(order_id, { status });
//       await associations.order_car(order);
//       await associations.order_user(order);

//       res.status(200).json({
//         status: 200,
//         data: order
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: 500,
//         error: err.message
//       });
//     }
//   }

//   async count(req, res) {
//     try {
//       const { user_id } = req.params;
//       const count = await orderTable.count(user_id);

//       res.status(200).json({
//         status: 200,
//         data: count
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: 500,
//         error: err.message
//       });
//     }
//   }

//   async countBySeller(req, res) {
//     try {
//       const { seller_id } = req.params;
//       const count = await orderTable.countBySellerId(seller_id);

//       res.status(200).json({
//         status: 200,
//         data: count
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: 500,
//         error: err.message
//       });
//     }
//   }
// }
