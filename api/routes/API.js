var express = require("express");
var router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

router.get("/", function (req, res, next) {
  res.send("API is working properly");
});

router.get("/countries", async (req, res) => {
  try {
    const countries_data = await fetch(
      "https://api.v2.emissions-api.org/api/v2/countries.json"
    );
    const countries_dataJson = await countries_data.json();

    //console.log(countries_dataJson);
    res.send(countries_dataJson);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

router.get("/products", async (req, res) => {
  try {
    const products_data = await fetch(
      "https://api.v2.emissions-api.org/api/v2/" + "" + "products.json"
    );
    const products_dataJson = await products_data.json();

    //console.log(products_dataJson);
    res.send(products_dataJson);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
