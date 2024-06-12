const cors  = require("cors")
const express = require("express")
const stripe = require("stripe")("sk_test_51PQ23NKhZAmovhQkvHF0kx7TcOvaC2pPiiQPr1ITGH0qKvmaXK1GNt6whZW7oRutGdsEExlNuIYQYBHfoqbHvMzC00bQL9q6gN")
const uuid = require("uuid")


const app = express()

app.use(express.json())
app.use(cors())



app.get("/" , (req,res)=>{
    res.send("hello jarvis")
})

app.post("/payment",(req,res)=>{
    const {product  , token } = req.body
    console.log(product)
    console.log(product.price)
    const idempontencykey = uuid()

    return stripe.customers.create({
        email : token.email ,
        source : token.id
     }).then(customer=>{
        stripe.charges.create({
            amount : product.price*100 , 
            currency : "usd"  ,
         customer : customer.id , 
         recipt_email : token.email , 
         description : `purchase of product.name` , 
         shipping : {
            name : token.card.name , 
            address : {
                country : token.card.address_country
            }
         }


        }, {idempontencykey})
     }).then(result => res.status(200).json(result)).catch(err => console.log(err))
     
})


app.listen(5000 , ()=>{
    console.log("server is running on pert 5000")
})