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

router.post("/flight", async (req, res) => {
  const flight_data = await fetch(
    "https://api.v2.emissions-api.org/api/v2/" +
      "" +
      "/statistics.json?polygon=30&polygon=10&polygon=40&polygon=40&polygon=20&polygon=40&polygon=10&polygon=20&polygon=30&polygon=10&interval=day&begin=2019-02-10&end=2019-02-11&limit=100&offset=0"
  );
  console.log(req.body.departure);
});

var test = router.post("/flight");
//console.log(test);

module.exports = router;
