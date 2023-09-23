const express = require("express");

const router = express.Router();

function checkData(req, res, next) {
    if (global.food_items && global.foodCategory) {
      next();
    } else {
      res.status(500).send("Data not available");
    }
  }

router.post('/foodData',(req,res)=>{
    try{
        res.send([global.food_items, global.foodCategory])
    }catch(error){
        console.error(error.message);
        res.send("Server Error")
    }
})

module.exports = router;