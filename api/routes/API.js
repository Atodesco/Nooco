var express = require("express");
var router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

router.get("/", function (req, res, next) {
  res.send("API is working properly");
});

// router.get("/countries", async (req, res) => {
//   try {
//     const countries_data = await fetch(
//       "https://api.v2.emissions-api.org/api/v2/countries.json"
//     );
//     const countries_dataJson = await countries_data.json();

//     //console.log(countries_dataJson);
//     res.send(countries_dataJson);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Something went wrong");
//   }
// });

router.get("/products", async (req, res) => {
  try {
    const products_data = await fetch(
      "https://api.v2.emissions-api.org/api/v2/" + "" + "products.json"
    );
    const products_dataJson = await products_data.json();

    res.send(products_dataJson);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

router.post("/flight", async (req, res) => {
  try {
    const flight_data = await fetch(
      "https://api.v2.emissions-api.org/api/v2/" +
        req.body.product.name +
        "/statistics.json?" +
        "geoframe=" +
        req.body.departure.lat +
        "&geoframe=" +
        req.body.departure.lng +
        "&geoframe=" +
        //ici on ajoutera les destinations supplementaires
        req.body.arrival.lat +
        "&geoframe=" +
        req.body.arrival.lng +
        "&interval=day&begin=" +
        req.body.startdate.slice(0, 10) +
        "&end=" +
        req.body.enddate.slice(0, 10) +
        "&limit=100&offset=0"
    );
    console.log(
      "https://api.v2.emissions-api.org/api/v2/" +
        req.body.product.name +
        "/statistics.json?" +
        "geoframe=" +
        req.body.departure.lat +
        "&geoframe=" +
        req.body.departure.lng +
        "&geoframe=" +
        //ici on ajoutera les destinations supplementaires
        req.body.arrival.lat +
        "&geoframe=" +
        req.body.arrival.lng +
        "&interval=day&begin=" +
        req.body.startdate.slice(0, 10) +
        "&end=" +
        req.body.enddate.slice(0, 10) +
        "2019-02-11&limit=100&offset=0"
    );
    const flight_dataJson = await flight_data.json();
    res.send(flight_dataJson);
    console.log("log", flight_dataJson);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
  console.log("backdep", req.body.departure);
  console.log("backarr", req.body.arrival);
  console.log("backproduct", req.body.product.name);
  console.log("backstartdate", req.body.startdate);
  console.log("backenddate", req.body.enddate);
});

module.exports = router;
