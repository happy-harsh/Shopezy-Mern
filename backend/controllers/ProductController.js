const ProductModel = require("../models/ProductModel");

const productsData = [
    {
      proImg: "https://source.unsplash.com/featured/?product",
      proName: "Stylish Watch",
      proDesc: "Classic timepiece for everyday wear.",
      price: 99.99,
      date: new Date("2023-01-01")
    },
    {
      proImg: "https://source.unsplash.com/featured/?product",
      proName: "Leather Wallet",
      proDesc: "Handcrafted leather wallet with multiple compartments.",
      price: 49.99,
      date: new Date("2023-02-05")
    },
    {
      proImg: "https://source.unsplash.com/featured/?product",
      proName: "Wireless Earbuds",
      proDesc: "Sleek and ergonomic earbuds with noise cancellation.",
      price: 129.99,
      date: new Date("2023-03-10")
    },
    {
      proImg: "https://source.unsplash.com/featured/?product",
      proName: "Smartphone Holder",
      proDesc: "Adjustable holder for smartphones of various sizes.",
      price: 19.99,
      date: new Date("2023-04-15")
    },
    {
      proImg: "https://source.unsplash.com/featured/?product",
      proName: "Travel Backpack",
      proDesc: "Durable and spacious backpack for travelers.",
      price: 79.99,
      date: new Date("2023-05-20")
    },
    {
      proImg: "https://source.unsplash.com/featured/?product",
      proName: "Fitness Tracker",
      proDesc: "Track your fitness goals with this sleek tracker.",
      price: 59.99,
      date: new Date("2023-06-25")
    },
    {
      proImg: "https://source.unsplash.com/featured/?product",
      proName: "Coffee Maker",
      proDesc: "Efficient coffee maker for home or office use.",
      price: 129.99,
      date: new Date("2023-07-30")
    },
    {
      proImg: "https://source.unsplash.com/featured/?product",
      proName: "Desk Organizer",
      proDesc: "Keep your workspace tidy with this organizer.",
      price: 24.99,
      date: new Date("2023-08-05")
    },
    {
      proImg: "https://source.unsplash.com/featured/?product",
      proName: "Portable Speaker",
      proDesc: "Wireless speaker for on-the-go music lovers.",
      price: 69.99,
      date: new Date("2023-09-10")
    },
    {
      proImg: "https://source.unsplash.com/featured/?product",
      proName: "Leather Journal",
      proDesc: "Elegant journal for writing and sketching.",
      price: 34.99,
      date: new Date("2023-10-15")
    },
    {
      proImg: "https://source.unsplash.com/featured/?product",
      proName: "Digital Camera",
      proDesc: "Capture memorable moments with this high-quality camera.",
      price: 299.99,
      date: new Date("2023-11-20")
    },
    {
      proImg: "https://source.unsplash.com/featured/?product",
      proName: "Wireless Keyboard",
      proDesc: "Ergonomic keyboard for comfortable typing.",
      price: 49.99,
      date: new Date("2023-12-25")
    },
    // ... and so on for additional products
  ];

  const handleInsertDoc = () => {

    ProductModel.insertMany(productsData)
    .then(() => {
        console.log("Products inserted successfully");
    })
    .catch((err) => {
        console.error("Error inserting products:", err);
    });
  }

  const handleAddProduct = async (req,res) => {
    const {proImg, proName, proDesc, proTag,proCat,proQty,price} = req.body;
    
    const newProduct = {
        proImg,
        proName,
        proDesc,
        proTag,
        proCat,
        proQty,
        price,
    }
    await ProductModel.create(newProduct).then(()=>{
        res.status(200).send({message:"product created successfully"})
    }).catch((err)=>{
        res.status(400).send(err.message);
    })

  }

  const handleGetAllProducts = async (req, res) => {
    await ProductModel.find({}).then((data)=>{
        res.status(200).send(data);
    }).catch((err)=>{
        res.status(400).send(err.message);
    })
  }

  const handleDeleteAllProducts = async (req,res) => {
    await ProductModel.deleteMany({}).then(()=>{
      res.status(200).send({message:"All Products deleted successfully"});
    }).catch((err)=>{
      res.status(400).send(err.message);
    })
  }
  const handleDeleteProduct = async (req, res) => {
    try {
        // Your role-based authorization check
        // Check for the presence of req.adminData provided by the middleware
        if (!req.adminData) {
            return res.status(403).send("Unauthorized: Admin role required");
        }

        const productId = req.params.proId;
        // Delete logic using productId
        await ProductModel.findOneAndDelete({ proId: productId });
        return res.status(200).send("Product deleted successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error deleting the product");
    }
};

  module.exports = {
    handleInsertDoc,
    handleAddProduct,
    handleGetAllProducts,
    handleDeleteAllProducts,
    handleDeleteProduct
  }