let id = 1;

export const orderTable = {
  orders: [
    {
      id,
      buyer: 1,
      car_id: 1,
      amount: 415.89,
      status: 'Pending',
      seller: 1
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
  getOrdersByBuyer(buyer_id) {
    const arr = this.orders.filter(value => value.buyer == buyer_id);
    return arr;
  },
  getOrdersBySeller(seller_id) {
    const arr = this.orders.filter(
      value => value.seller == seller_id && value.status === 'Pending'
    );
    return arr;
  },
  update(order_id, { price, status }) {
    let order = {};
    this.orders.forEach((value) => {
      if (value.id == order_id) {
        order = value;
      }
    });
    if (price && order.status == 'Pending') {
      order.old_price_offered = order.amount || order.new_price_offered;
      order.new_price_offered = price;
      if (order.amount) {
        delete order.amount;
      }
    }
    order.status = status || order.status;

    this.orders.forEach((value, index) => {
      if (value.id == order.id) {
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
  },
  count(user_id) {
    let count = 0;
    if (!user_id) count = this.orders.length;
    else {
      this.orders.forEach((value) => {
        if (value.buyer == user_id) count++;
      });
    }
    return count;
  },
  countBySellerId(seller_id) {
    let count = 0;
    this.orders.forEach((value) => {
      if (value.seller == seller_id && value.status === 'Pending') count++;
    });
    return count;
  }
};
