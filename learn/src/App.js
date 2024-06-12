import logo from './logo.svg';
import './App.css';

import StripeCheckout from 'react-stripe-checkout';
import { useState } from 'react';


function App() {
  const [product, setProduct] = useState({
    name : "React from FB" , 
    price : 10 , 
    productBy :  "facebook" 
  })

  const makePayment = token =>{
      const body = {
          token , 
          product
      }
      const headers = {
        "Content-Type" : "application/json"
      }
      return fetch("/payment",{
        method : "POST" , 
        headers ,
        body : JSON.stringify(body)
      // }).then((res)=>{return res.json()}).then((data)=>{
      //   console.log(data)
      
      // })
      }).then(response =>{
        console.log("RESPONSE", response)
        const {status} = response ; 
        console.log("STATUS" , status)
      }).catch(error =>{
          console.log(error)
      })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout stripeKey="pk_test_51PQ23NKhZAmovhQkx5XHDTFQDVXGxadHp6AGHwYAEvfQmhqwSKmhkgFXt7O1oFKdQKhGsrOjV2ocgPwys4yztXHh0082ITHUvD" token= {makePayment} name = 'Buy React' amount={product.price*100} >
          <button className='btn-large blue'>Buy React is just {product.price} $</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
