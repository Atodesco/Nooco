import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import "../formulaire.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Geocode from "react-geocode";

export default function Formulaire() {
  const [products, setProducts] = useState();
  // const [countries, setCountries] = useState();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");

  // const [dep, setDep] = useState("");
  // const [arr, setArr] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("http://localhost:9000/API/products");
      console.log(data);
      const datajson = await data.json();
      setProducts(datajson);
    }
    fetchData();
  }, []);
  const [choice, setChoice] = useState("");
  const handleChange = (e) => {
    setChoice(e.target.value);
  };
  //Geocode//
  Geocode.setApiKey("AIzaSyAeWom0q8-MV4K3W5vdVzO5MpVvWgJNZP8");
  Geocode.setLocationType("ROOFTOP");
  Geocode.setLanguage("fr");
  //END geocode//

  return (
    <div>
      {products && (
        <div className="Formulaire1">
          <FormControl fullWidth>
            <InputLabel id="">Products</InputLabel>
            <Select
              labelId=""
              id=""
              value={choice}
              label="Products"
              onChange={handleChange}
            >
              {products.map((p, i) => {
                return (
                  <MenuItem value={p} key={i}>
                    {p.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      )}
      <div className="DA">
        <div className="Departure">
          <TextField
            onChange={(e) => {
              setDeparture(e.target.value);
              if (e.key == "Enter") {
                console.log(e.key);
              }
            }}
            value={departure}
            id="outlined-basic"
            label="Departure"
            variant="outlined"
          />
        </div>
        <div className="Arrival">
          <TextField
            onChange={(e) => {
              setArrival(e.target.value);
            }}
            value={arrival}
            id="outlined-basic"
            label="Arrival"
            variant="outlined"
          />
        </div>
      </div>
      <div className="Date">
        <DatePicker
          placeholderText="Date Departure"
          isClearable
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker
          placeholderText="Date Arrival"
          isClearable
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onChange={(date) => setEndDate(date)}
        />
      </div>
      <div className="Button">
        <Button
          onClick={async function () {
            // Geocode.fromAddress(departure).then(
            //   (response) => {
            //     setDep(response.results[0].geometry.location);
            //     console.log("departure", dep.lat, dep.lng);
            //   },
            //   (error) => {
            //     console.error(error);
            //   }
            // );
            const rawd = await Geocode.fromAddress(departure);
            const data_departure = rawd.results[0].geometry.location;
            console.log("datadeparture", data_departure);
            //setDep(data);

            const rawa = await Geocode.fromAddress(arrival);
            const data_arrival = rawa.results[0].geometry.location;
            console.log("datadeparture", data_arrival);
            //setDep(data);
            // Geocode.fromAddress(arrival).then(
            //   (response) => {
            //     setArr(response.results[0].geometry.location);
            //     console.log("dataarrival", arr.lat, arr.lng);
            //   },
            //   (error) => {
            //     console.error(error);
            //   }
            // );

            console.log("frontdep", data_departure);
            console.log("frontarr", data_arrival);
            console.log("startdate", startDate);
            fetch("http://localhost:9000/API/flight", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                departure: data_departure,
                arrival: data_arrival,
                product: choice,
                startdate: startDate,
                enddate: endDate,
              }),
            });
          }}
          variant="contained"
        >
          Contained
        </Button>
      </div>
    </div>
  );
}
