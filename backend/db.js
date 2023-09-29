const mongoose = require("mongoose");

async function mongoDB() {
  const dbUrl =
    "mongodb+srv://gofood:gaurilaxmi@cluster0.sgoxdo2.mongodb.net/gofoodmern?retryWrites=true&w=majority";

    try {
      await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 30000,
      });
      console.log("MongoDB connected successfully");
  
      const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
      const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
      
      global.food_items = fetched_data;
      global.foodCategory = foodCategory;
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  }
  
  module.exports = mongoDB;
