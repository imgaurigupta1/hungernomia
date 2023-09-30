const express = require('express');
const app = express()
// const port = process.env.PORT || 5000
const cors = require("cors");
const stripe = require("stripe")("sk_test_51N94gySA5ZcPgQCJIALDFZgNRFghGfdgDuxzbU9R0KGZEyDicomtMjmxGEiE7b9A8B9LvxRlQ3C4eKqHu7IzLoIN00GIPkZYYa")

const mongoDB = require("./db")
mongoDB();

// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin","https://hungernomiawebsitebackend.vercel.app");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// })

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json())
app.use(cors(
  {
  origin: ["https://hungernomia-l2ys8c8xa-imgaurigupta1.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}
));

app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/DisplayData"))
app.use('/api', require("./Routes/OrderData"))

app.post("/api/create-checkout-session", async(req,res)=>{
  const {products} = req.body;
  //  console.log(products)
  const lineitems = products.map((product)=>({
    price_data:{
      currency:"inr",
      product_data:{
        name:product.name
      },
      unit_amount:product.price * 100,
    },
    quantity:product.qty
  }))
  const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineitems,
    mode: "payment",
    success_url:"https://hungernomia.vercel.app/success",
    cancel_url:"https://hungernomia.vercel.app/cancel"
  })

  res.json({id:session.id})

})

module.exports = app;
// app.listen(port, () => {
//   console.log(`Example app listening on http://localhost:${port}`);
// });
