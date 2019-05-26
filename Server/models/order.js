let id = 1;

export const orderTable = {
  orders: [
    {
      id,
      buyer: 1,
      car_id: 1,
      amount: 415.89,
      status: 'pending'
    }
  ],
  create(obj) {
    id++;
    const item = obj;
    item.id = id;
    this.orders.push(item);

    return item;
  },
  getOrders() {
    return this.orders;
  },
  getOrderById(order_id) {
    let order = {};
    this.orders.forEach((value) => {
      if (value.id == order_id) {
        order = value;
      }
    });

    return order;
  },
  update(order_id, { price, status }) {
    let order = {};
    this.orders.forEach((value) => {
      if (value.id == order_id) {
        order = value;
      }
    });
    if (price && order.status === 'pending') {
      order.old_price_offered = order.amount || order.new_price_offered;
      order.new_price_offered = price;
      if (order.amount) {
        delete order.amount;
      }
    }
    order.status = status || order.status;

    this.orders.forEach((value, index) => {
      if (value.id === order.id) {
        this.orders.splice(index, 1, order);
      }
    });

    return order;
  },
  delete(order_id) {
    if (!order_id) this.orders.shift();
    else {
      this.orders.forEach((value, index) => {
        if (value.id === order_id) {
          this.orders.splice(index, 1);
        }
      });
    }

    return 'Order deleted';
  }
};
