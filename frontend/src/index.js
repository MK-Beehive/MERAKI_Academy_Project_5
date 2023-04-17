import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { Provider } from "react-redux";
import store from "../src/components/redux/store";

// Bringing in the GoogleOAuthProvider from the package
import { GoogleOAuthProvider } from "@react-oauth/google";


///===ad Paymant==================


// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_51Mxn4uFKzpLJBNgHJFMTYVZ78koOA4onNYIcivNeibi2YRNfcaL6pnqgv2f75zycmx3ftAG4u20qx0QtY5yBduSl00aEBwQACh');

// const options = {
//   // passing the client secret obtained from the server
//   clientSecret:'sk_test_51Mxn4uFKzpLJBNgH0BiwJtieg7qcKxI5npgFT2PdhBZlesBaBKenJboyAfIWmbCLrD871z9oD0hQ5VZGnjEQQsAr00bN61uYyi',
// };
// //================== 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
 


  <BrowserRouter>
    {/* <Elements stripe={stripePromise} options={options}> */}
    <Provider store={store}>
      <GoogleOAuthProvider clientId="995333756790-0gje45rsehs0k91pavsr51carp0snih2.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
   {/* </Elements > */}
  </BrowserRouter>

);
