const express = require("express");
const mongoose = require("mongoose");
const Product = require('./models/productModel');
const app = express();

//routes
app.use(express.json())
app.get("/", (req, res) => {
  res.send("Trying sending to client ");
});

app.get("/blog", (req, res) => {
  res.send("sending in blog my name is Omar");
});

//create route for saving and getting data from/to the database
app.get('/product',async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

app.get('/product/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
})
app.post("/product", async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
});

//updating and editing data
app.put('/product/:id',async (req,res)=>{
    try {
        const {id}= req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        //check if the product is in the database or not
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})
//deleting a product
app.delete('/product/:id',async (req,res)=>{
    try {
        const {id}= req.params;
        const product = await Product.findByIdAndDelete(id);
        return res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://admin:admin@omarnasrt.nl5a1ff.mongodb.net/Node-API")
  .then(() => {
    console.log("connected to mongo db database");
    app.listen(3000, () => {
      console.log(`node api is running on 3000`);
    });
  })
  .catch(() => {
    console.log(error);
  });
