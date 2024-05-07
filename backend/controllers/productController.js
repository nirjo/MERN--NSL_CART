const Product = require('../models/productModel')

//create product -api/v1/products

exports.getProducts =async (req,res,next)=>{
  const products = await Product.find();
res.status(200).json({
    success :true,
    count:products.length,
    products
})
}
//create product -api/v1/product/new

exports.newProduct =async (req,res,next)=>{
  const product= await Product.create(req.body)
  res.status(201).json({
    success :true,
    product
})
    }
 

    exports.getSingleProduct = async (req, res, next) => {
      try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: "Product not found"
          });
        }
        res.status(200).json({
          success: true,
          product
        });
      } catch (error) {
        // Handle any potential errors
        next(error);
      }
    };

    exports.updateProduct = async (req, res, next) => {
      
        let product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: "Product not found"
          });
        }
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
          new :true,
          runValidators:true
        })
       res.status(200).json({
        success: true,
        product
       })
    };