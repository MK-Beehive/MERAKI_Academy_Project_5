import axios from "axios";
import { useSelector } from "react-redux";
import "./payment.css"
// import { url } from "../slices/api";

const Paymant = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);
console.log("cartItems-------------------------------------------------",cartItems)




  const handleCheckout = () => {
    axios
      .post(`http://localhost:5000/create-checkout-session`
      , {
        cartItems
        
      }
      )
      .then((response) => {
        console.log("r.....................esponse",response)
        if (response.data.result) {
          window.location.href = response.data.result
          ;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button className="button" onClick={() => handleCheckout()}>Pay Now</button>
    </>
  );
};

export default Paymant