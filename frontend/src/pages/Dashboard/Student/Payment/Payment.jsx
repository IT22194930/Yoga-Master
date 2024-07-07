// import React from 'react'
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { Navigate, useLocation } from 'react-router-dom';
// import './Payment.css'
// import CheckoutPayment from './CheckoutPayment';

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);
// const Payment = () => {
//    const location = useLocation();
//    // console.log(location)
//    const price = location?.state?.price;
//    const cartItem = location?.state?.itemId;
//    if(!price) {
//       return <Navigate to="/dashboard/my-selected"/>
//    }

//   return (
//     <div className='my-40 stripe-custom-class'>
//       <Elements stripe={stripePromise}>
//          <CheckoutPayment price={price} cartItem={cartItem}/>
//       </Elements>
//     </div>
//   )
// }

// export default Payment

import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Navigate, useLocation } from 'react-router-dom';
import CheckoutPayment from './CheckoutPayment';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);

const Payment = () => {
   const location = useLocation();
   const price = location?.state?.price;
   const cartItem = location?.state?.itemId;

   if (!price) {
      return <Navigate to="/dashboard/my-selected" />
   }

   return (
      <div className='my-40 stripe-custom-class'>
         <style>
            {`
              //  #root {
              //     display: flex;
              //     align-items: center;
              //  }

              //  body {
              //     font-family: -apple-system, BlinkMacSystemFont, sans-serif;
              //     font-size: 16px;
              //     -webkit-font-smoothing: antialiased;
              //     display: flex;
              //     justify-content: center;
              //     align-content: center;
              //     height: 100vh;
              //     width: 100vw;
              //  }

               form {
                  width: 30vw;
                  min-width: 500px;
                  align-self: center;
                  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
                     0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
                  border-radius: 7px;
                  padding: 40px;
               }

               #payment-message {
                  color: rgb(105, 115, 134);
                  font-size: 16px;
                  line-height: 20px;
                  padding-top: 12px;
                  text-align: center;
               }

               #payment-element {
                  margin-bottom: 24px;
               }

               button {
                  background: #5469d4;
                  font-family: Arial, sans-serif;
                  color: #ffffff;
                  border-radius: 4px;
                  border: 0;
                  padding: 12px 16px;
                  font-size: 16px;
                  font-weight: 600;
                  cursor: pointer;
                  display: block;
                  transition: all 0.2s ease;
                  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
               }

               button:hover {
                  filter: contrast(115%);
               }

               button:disabled {
                  opacity: 0.5;
                  cursor: default;
               }

               .spinner,
               .spinner:before,
               .spinner:after {
                  border-radius: 50%;
               }

               .spinner {
                  color: #ffffff;
                  font-size: 22px;
                  text-indent: -99999px;
                  margin: 0px auto;
                  position: relative;
                  width: 20px;
                  height: 20px;
                  box-shadow: inset 0 0 0 2px;
                  -webkit-transform: translateZ(0);
                  -ms-transform: translateZ(0);
                  transform: translateZ(0);
               }

               .spinner:before,
               .spinner:after {
                  position: absolute;
                  content: '';
               }

               .spinner:before {
                  width: 10.4px;
                  height: 20.4px;
                  background: #5469d4;
                  border-radius: 20.4px 0 0 20.4px;
                  top: -0.2px;
                  left: -0.2px;
                  -webkit-transform-origin: 10.4px 10.2px;
                  transform-origin: 10.4px 10.2px;
                  -webkit-animation: loading 2s infinite ease 1.5s;
                  animation: loading 2s infinite ease 1.5s;
               }

               .spinner:after {
                  width: 10.4px;
                  height: 10.2px;
                  background: #5469d4;
                  border-radius: 0 10.2px 10.2px 0;
                  top: -0.1px;
                  left: 10.2px;
                  -webkit-transform-origin: 0px 10.2px;
                  transform-origin: 0px 10.2px;
                  -webkit-animation: loading 2s infinite ease;
                  animation: loading 2s infinite ease;
               }

               @keyframes loading {
                  0% {
                     -webkit-transform: rotate(0deg);
                     transform: rotate(0deg);
                  }
                  100% {
                     -webkit-transform: rotate(360deg);
                     transform: rotate(360deg);
                  }
               }

               @media only screen and (max-width: 600px) {
                  form {
                     width: 80vw;
                     min-width: initial;
                  }
               }
            `}
         </style>
         <Elements stripe={stripePromise}>
            <CheckoutPayment price={price} cartItem={cartItem} />
         </Elements>
      </div>
   )
}

export default Payment
