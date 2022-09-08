import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import "../formulaire.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Geocode from "react-geocode";

export default function Formulaire() {
  const [products, setProducts] = useState();
  const [countries, setCountries] = useState();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("http://localhost:9000/API/products");
      console.log(data);
      const datajson = await data.json();
      setProducts(datajson);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchDataCountries() {
      const data_countries = await fetch("http://localhost:9000/API/countries");
      console.log(data_countries);
      const data_countriesjson = await data_countries.json();
      setCountries(data_countriesjson);
    }
    fetchDataCountries();
  }, []);
  const [choice, setChoice] = useState();
  const handleChange = (e) => {
    setChoice(e.target.value);
  };
  //Geocode//
  Geocode.setLocationType("ROOFTOP");

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
      {countries && (
        <div className="Formulaire2">
          <FormControl fullWidth>
            <InputLabel id="">Departure</InputLabel>
            <Select
              labelId=""
              id=""
              value={choice}
              label="Departure"
              onChange={handleChange}
            >
              {Object.keys(countries).map((p, i) => {
                return (
                  <MenuItem value={p} key={i}>
                    {Object.values(countries)[i]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      )}
      {countries && (
        <div className="Formulaire2">
          <FormControl fullWidth>
            <InputLabel id="">Arrival</InputLabel>
            <Select
              labelId=""
              id=""
              value={choice}
              label="Arrival"
              onChange={handleChange}
            >
              {Object.keys(countries).map((p, i) => {
                return (
                  <MenuItem value={p} key={i}>
                    {Object.values(countries)[i]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      )}
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <div className="Date">
        <DatePicker
          isClearable
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker
          isClearable
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onChange={(date) => setEndDate(date)}
        />
      </div>
      <FormControl fullWidth></FormControl>
    </div>
  );
}
