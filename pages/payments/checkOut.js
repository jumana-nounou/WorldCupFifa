import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }) {
  let stripePromise = null;

  const getStripe = () => {
    if (!stripePromise) {
      const PUBLIC_KEY =
        "pk_test_51L4RuPIg7OYMXGQ3j1tsKaodRiTOdtqAb1bK3GM3FXmnXfFJWSekOPqhC5RxjakY96CaZA4hNCw97K95uxk8Mgq700ypLQOBmg";
      stripePromise = loadStripe(PUBLIC_KEY);
      // process.env.NEXT_PUBLIC_API_KEY
    }
    return stripePromise;
  };

  const stripe = await getStripe();
  console.log(stripe);

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  });
}
