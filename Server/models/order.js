let id = 0;

export const orderTable = {
  orders: [],
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
      if (value.id === order_id) {
        order = value;
      }
    });

    return order;
  },
  update(order_id, { amount, status }) {
    let order = {};
    this.orders.forEach((value) => {
      if (value.id === order_id) {
        order = value;
      }
    });
    order.amount = amount || order.amount;
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

    return true;
  }
};
