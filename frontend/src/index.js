import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";


import {Provider} from "react-redux"
import store from "../src/components/redux/store"

// Bringing in the GoogleOAuthProvider from the package
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store={store}>
  <GoogleOAuthProvider clientId="995333756790-0gje45rsehs0k91pavsr51carp0snih2.apps.googleusercontent.com">
       <App />
       </GoogleOAuthProvider>
   </Provider>
  </React.StrictMode>
);
