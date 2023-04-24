const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Stripe } = require("stripe");

const app = express();

// Stripe.api_key =
//   "pk_test_51N0UMzGzGZyvX23lZRshDDIljl1TqljsgAvKzv30x9xHAW34HnRi1Ti1IFmqAJmpiiFQHL17wVqMky7xrgosmqlY007Vz90qrh";

// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")(
  "sk_test_51N0UMzGzGZyvX23ldHXHZAgJM7HFkh3ewBPOG6swUdPH3m5QjBkOYw1fYs23bzruB9cJQuFfRY62Y3zvdha8ny7H00mFiOr8kE"
);

// router
app.post("/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            image: [item.product],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "https://localhsot:4242/success.html",
      cancel_url: "https://localhsot:4242/success.html",
    });

    res.status(200).json(session);
  } catch (error) {
    console.log(error);
  }
});

app.listen(4242, () => {
  console.log("App is rnning on port 4242");
});
