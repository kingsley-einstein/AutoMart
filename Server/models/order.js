let id = 0;

export const orderTable = {
    orders: [],
    create(obj) {
        id++;
        obj.id = id;
        this.orders.push(obj);

        return obj;
    },
    getOrders() {
        return this.orders;
    },
    getOrderById(id) {
        let order = {}
        this.orders.forEach(value => {
            if (value.id === id)
                order = value;
        });

        return order;
    },
    update(id, { amount, status }) {
        let order = {};
        this.orders.forEach(value => {
            if (value.id === id)
                order = value;
        });
        order.amount = amount ? amount : order.amount;
        order.status = status ? status : order.status;

        this.orders.forEach((value, index) => {
            if (value.id === order.id)
                this.orders.splice(index, 1, order);
        });

        return order;
    },
    delete(id) {
        if (!id) this.orders.shift()
        else this.orders.forEach((value, index) => {
            if (value.id === id) 
                this.orders.splice(index, 1);
        });

        return true;
    }
}