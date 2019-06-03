const id = window.localStorage.getItem('id');
const adsCount = document.getElementById('ads-count');
const ordersCount = document.getElementById('orders-count');
const soldCount = document.getElementById('sold-count');
const pendingCount = document.getElementById('pending-count');
const backDrop = document.getElementById('backdrop');

const countADs = async () => {
  const count = fetch(`/api/v1/cars/${parseInt(id)}/count`);
  return count.then(res => res.json());
};

const countOrders = async () => {
  const count = fetch(`/api/v1/orders/${parseInt(id)}/count`);
  return count.then(res => res.json());
};

const countSoldCars = async () => {
  const count = fetch(`/api/v1/cars/${parseInt(id)}/by_status?status=Sold`);
  return count.then(res => res.json());
};

const countPending = async () => {
  const count = fetch(`/api/v1/cars/${parseInt(id)}/by_status?status=Available`);
  return count.then(res => res.json());
};

const count = async () => {
  backDrop.classList.add('show');
  await countADs().then(({ data, status, error }) => {
    const statusToString = status.toString();
    if (/(4\d\d)|(5\d\d)/.test(statusToString)) {
      if (backDrop.classList.contains('show')) {
        backDrop.classList.remove('show');
      }
      adsCount.textContent = `${error}`;
    } else {
      if (backDrop.classList.contains('show')) {
        backDrop.classList.remove('show');
      }
      adsCount.textContent = `${data}`;
    }
  }).catch((err) => {
    if (backDrop.classList.contains('show')) {
      backDrop.classList.remove('show');
    }
    console.log(err);
  });
  await countOrders().then(({ data, status, error }) => {
    const statusToString = status.toString();
    if (/(4\d\d)|(5\d\d)/.test(statusToString)) {
      if (backDrop.classList.contains('show')) {
        backDrop.classList.remove('show');
      }
      ordersCount.textContent = `${error}`;
    } else {
      if (backDrop.classList.contains('show')) {
        backDrop.classList.remove('show');
      }
      ordersCount.textContent = `${data}`;
    }
  }).catch((err) => {
    if (backDrop.classList.contains('show')) {
      backDrop.classList.remove('show');
    }
    console.log(err);
  });
  await countSoldCars().then(({ data, status, error }) => {
    const statusToString = status.toString();
    if (/(4\d\d)|(5\d\d)/.test(statusToString)) {
      if (backDrop.classList.contains('show')) {
        backDrop.classList.remove('show');
      }
      soldCount.textContent = `${error}`;
    } else {
      if (backDrop.classList.contains('show')) {
        backDrop.classList.remove('show');
      }
      soldCount.textContent = `${data}`;
    }
  }).catch((err) => {
    if (backDrop.classList.contains('show')) {
      backDrop.classList.remove('show');
    }
    console.log(err);
  });
  await countPending().then(({ data, status, error }) => {
    const statusToString = status.toString();
    if (/(4\d\d)|(5\d\d)/.test(statusToString)) {
      if (backDrop.classList.contains('show')) {
        backDrop.classList.remove('show');
      }
      pendingCount.textContent = `${error}`;
    } else {
      if (backDrop.classList.contains('show')) {
        backDrop.classList.remove('show');
      }
      pendingCount.textContent = `${data}`;
    }
  }).catch((err) => {
    if (backDrop.classList.contains('show')) {
      backDrop.classList.remove('show');
    }
    console.log(err);
  });
};
count();
