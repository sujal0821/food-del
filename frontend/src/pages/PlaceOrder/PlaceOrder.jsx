import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let response = await axios.post(url + "/api/place", orderData, {
      headers: { token },
    });

    /* new api */
    // let data2 = fetch("http://localhost:4000/api/place", {
    //   "headers": {
    //     "accept": "application/json, text/plain, */*",
    //     "accept-language": "en-US,en;q=0.9,en-IN;q=0.8",
    //     "content-type": "application/json",
    //     "sec-ch-ua": "\"Microsoft Edge\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    //     "sec-ch-ua-mobile": "?0",
    //     "sec-ch-ua-platform": "\"Windows\"",
    //     "sec-fetch-dest": "empty",
    //     "sec-fetch-mode": "cors",
    //     "sec-fetch-site": "same-site",
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjFmOGVmYjcyZjI4YzVkZjk2ZjNhNCIsImlhdCI6MTczNTIzNzI3M30.45bZ6q-kF73CzuIW6c15oyDkrUl2v8RdgRX4xWts-Es"
    //   },
    //   "referrer": "http://localhost:5173/",
    //   "referrerPolicy": "strict-origin-when-cross-origin",
    //   "body": "{\"address\":{\"firstName\":\"aS\",\"lastName\":\"AS\",\"email\":\"AS\",\"street\":\"AS\",\"city\":\"AS\",\"state\":\"as\",\"zipcode\":\"SA\",\"country\":\"AS\",\"phone\":\"S\"},\"items\":[{\"_id\":\"6762019f946f258545e29a48\",\"name\":\"Greek salad\",\"description\":\"A crisp Greek salad with cucumbers, tomatoes, olives, red onions, and feta.\",\"price\":12,\"image\":\"1734476191079-food_1.png\",\"category\":\"Salad\",\"__v\":0,\"quantity\":1},{\"_id\":\"676201c6946f258545e29a4b\",\"name\":\"Veg salad\",\"description\":\"A fresh veggie salad with lettuce, cucumbers, tomatoes, carrots, and bell peppers.\",\"price\":18,\"image\":\"1734476230320-food_2.png\",\"category\":\"Salad\",\"__v\":0,\"quantity\":1},{\"_id\":\"676201e5946f258545e29a4d\",\"name\":\"Clover Salad\",\"description\":\"A vibrant Clover salad with fresh clover leaves, mixed greens, radishes, and a light vinaigrette.\",\"price\":16,\"image\":\"1734476261648-food_3.png\",\"category\":\"Salad\",\"__v\":0,\"quantity\":1},{\"_id\":\"67620205946f258545e29a4f\",\"name\":\"Chicken Salad\",\"description\":\"A hearty chicken salad with tender chicken, mixed greens, cucumbers, tomatoes, and a creamy dressing.\",\"price\":24,\"image\":\"1734476293693-food_4.png\",\"category\":\"Salad\",\"__v\":0,\"quantity\":1}],\"amount\":72}",
    //   "method": "POST",
    //   "mode": "cors",
    //   "credentials": "omit"
    // });
    // console.log(data2)

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("error");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="text"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
