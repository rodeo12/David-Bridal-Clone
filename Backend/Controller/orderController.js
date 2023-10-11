const Order = require('../Model/ordermodel');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, products, totalPrice } = req.body;

    const newOrder = new Order({
      user: userId,
      products,
      totalPrice,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





