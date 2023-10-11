const Product = require('../Model/productmodel');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { brand,title, image, price, color,fabric,size } = req.body;

    const newProduct = new Product({
      brand,
      title,
      image,
      price,
      color,
      fabric,
      size
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7 ;
    const skipIndex = (page-1) * limit;
    const sort = req.query.sortBy || '_id';
    const sortOrder = req.query.sortOrder || 'desc';


    const filter = {};
    if(req.query.title) {
        filter.title = req.query.title;
    }
    if(req.query.brand) {
      filter.brand = req.query.brand;
  }
    // if (req.query.gender && (req.query.gender === 'Male' || req.query.gender === 'Female')) {
    //     filter.gender = req.query.gender;
    // }
    if(req.query.color) {
        filter.color = req.query.color;
    }

    if(req.query.size) {
      filter.size = req.query.size;
  }
    
    // if(req.query.rating) {
    //     filter.rating = { $gte: req.query.rating };
    // }


    if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        filter.$or = [
            { title: searchRegex },
            { color: searchRegex },
            { brand: searchRegex},
            { size: searchRegex}
            // Add more fields to search from if needed
        ];
    }
    const products = await Product.find(filter).sort({ [sort]: sortOrder }).skip(skipIndex).limit(limit);
    return res.send(products)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




