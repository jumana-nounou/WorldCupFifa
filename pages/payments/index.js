import { Button, IconButton } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
function getCategory(cat) {
  let category;
  let price;
  if (cat == "category1") {
    category = 1;
    price = 75;
  } else if (cat == "category2") {
    category = 2;
    price = 125;
  } else if (cat == "category3") {
    category = 3;
    price = 195;
  }
  const categoryPrice = { category, price };

  return categoryPrice;
}
getCategory();
const checkout = () => {
  const initialize = () => {
    const key = "TicketCard";
    const initialValue = { price: "not defined" };
    try {
      const item = localStorage.getItem(key);

      if (item && item !== "undefined") {
        return JSON.parse(item);
      }

      localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    } catch {
      return initialValue;
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const data = router.query;

  console.log(data);
  const match = Number(data.match);
  const quantity = Number(data.quantity);
  const category = getCategory(data.category);
  console.log(category.category);
  const [submitted, setSubmit] = useState(false);
  const [charged, setCharged] = useState("");
  const [receipt_url, setReceipt_url] = useState("");
  const [email, setEmail] = useState("");
  const [stripeEmail, setStripeEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [CVC, setCVC] = useState("");

  const onCardChange = (event) => {
    console.log(event);
    setCardNumber(event.value);
  };
  const onMonthChange = (event) => {
    console.log(event);
    setExpirationMonth(event.value);
  };
  const onYearChange = (event) => {
    console.log(event);
    setExpirationYear(event.value);
  };
  const onCVCChange = (event) => {
    console.log(event);
    setCVC(event.value);
  };

  const onSubmit = async (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    try {
      setCharged("");
      setReceipt_url("");
      setStripeEmail("");

      const ticket = await axios.post(
        "https://reservation-new.vercel.app/api/reservation",
        {
          email: event.email,
          matchNumber: match,
          tickets: {
            category: category.category,
            quantity: quantity,
            price: category.price,
          },
          card: {
            number: event.cardNumber,
            expirationMonth: Number(event.ExpirationMonth),
            expirationYear: Number(event.ExpirationYear),
            cvc: event.CVC,
          },
        }
      );

      setCharged(ticket.data.message);
      // setReceipt_url(ticket.data.charge.receipt_url)
      // setStripeEmail(ticket.data.charge.receipt_email)
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        setCharged(error.response.data.message); // + " / " + error.response.status + " / " + error.response.headers);
        setReceipt_url("");
        setStripeEmail("");
      } else if (error.request) {
        // The request was made but no response was received
        setCharged(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log("error")
        setCharged("Error", error.message);
      }
      console.log("error:");
      console.log(error);
    }
    //   setCharged(ticket.data.message)
    //   setReceipt_url(ticket.data.charge.receipt_url)
    //   setStripeEmail(ticket.data.charge.receipt_email)
  };

  return (
    <div className="form-container">
      <IconButton
        color="primary"
        component="label"
        onClick={() => {
          router.push("/");
        }}
      >
        <ArrowBackIosNewRoundedIcon />
      </IconButton>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        {submitted ? (
          <div className="success-message">
            Payment succesfull!
            <p>{charged}</p>
            <p>{stripeEmail}</p>
            {stripeEmail && <a href={receipt_url}>View Receipt</a>}
          </div>
        ) : null}

        <input
          id="email"
          name="email"
          //   value={email}
          className="form-field"
          type="email"
          placeholder="Email"
          size="30"
          required
          color="black"
          onChange={(e) => setEmail(e.target.value)}
          {...register("email", {
            required: "email is required!",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
        />
        <span>{errors.email?.message}</span>
        {/* </label> */}

        {/* <label htmlFor="CardNumber">
        Card number */}
        <input
          id="Card number"
          name="Card number"
          className="form-field"
          type="text"
          placeholder="Card number"
          required
          maxLength={16}
          onChange={onCardChange}
          {...register("cardNumber", { required: "Card number is required!" })}
        />
        <span>{errors.cardNumber?.message}</span>
        {/* </label> */}

        {/* <label htmlFor="ExpirationMonth">
        Expiration Month */}
        <input
          id="ExpirationMonth"
          name="ExpirationMonth"
          className="form-field"
          type="text"
          placeholder="ExpirationMonth"
          maxLength={2}
          //   onChange={ (e)=> setExpirationMonth(e.value)}
          onChange={onMonthChange}
          required
          {...register("ExpirationMonth", {
            required: "Expiration Month is required!",
          })}
        />
        <span>{errors.ExpirationMonth?.message}</span>
        {/* </label> */}

        {/* <label htmlFor="ExpirationYear">
        Expiration Year */}
        <input
          id="ExpirationYear"
          name="ExpirationYear"
          className="form-field"
          type="text"
          placeholder="ExpirationYear"
          maxLength={4}
          required
          onChange={onYearChange}
          {...register("ExpirationYear", {
            required: "Expiration Year is required!",
          })}
          //   minLength:{value:4,message:"Password must be more than 4 characters"},
          //   maxLength:{value:20, message:"Password cannot be more than 20 characters"}
        />
        <span>{errors.ExpirationYear?.message}</span>
        {/* </label> */}

        {/* <label htmlFor="CVC">
        CVC */}
        <input
          id="CVC"
          name="CVC"
          className="form-field"
          type="text"
          placeholder="123"
          required
          maxLength={3}
          onChange={onCVCChange}
          {...register("CVC", { required: "CVC is required!" })}

          //   minLength:{value:4,message:"Password must be more than 4 characters"},
          //   maxLength:{value:20, message:"Password cannot be more than 20 characters"}
        />
        <span>{errors.CVC?.message}</span>
        {/* </label> */}

        <button className="form-field" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default checkout;
