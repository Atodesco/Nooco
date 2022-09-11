import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import "../formulaire.css";
import { Modal } from "@mui/material";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Geocode from "react-geocode";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Formulaire() {
  const [products, setProducts] = useState(["methane"]);

  const [startDate, setStartDate] = useState([new Date()]);
  const [endDate, setEndDate] = useState([new Date()]);

  const [departure, setDeparture] = useState([""]);
  const [arrival, setArrival] = useState([""]);

  const [counter, setCounter] = useState([0]);
  const [counter2, setCounter2] = useState(1);
  const [stopover, setStopover] = useState([[""]]);

  const [choice, setChoice] = useState([""]);
  const [openModal, SetOpenModal] = useState(false);

  const [allprint, setAllPrint] = useState([]);
  // const handleChange = (e) => {
  //   setChoice(e.target.value);
  // };
  useEffect(() => {
    async function fetchData() {
      const data = await fetch("http://localhost:9000/API/products");
      console.log(data);
      const datajson = await data.json();
      setProducts(datajson);
    }
    fetchData();
  }, []);
  //Geocode//
  Geocode.setApiKey("AIzaSyAeWom0q8-MV4K3W5vdVzO5MpVvWgJNZP8");
  Geocode.setLocationType("ROOFTOP");
  Geocode.setLanguage("fr");
  //END geocode//
  // const board = new Array(counter).fill(0);
  let board = [];
  //console.log("COUNTER", counter.length);
  for (let i = 0; i < counter.length; i++) {
    // for (let j = 0; j < counter[i]; j++) {
    //   board.push(0);
    // }

    //console.log("TEXTBOARD", board[i]);
    board[i] = new Array(counter[i]).fill(0);
  }

  const all = new Array(counter2).fill(0);

  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here
    // is better than directly setting `value + 1`
  }
  const forceUpdate = useForceUpdate();

  return (
    <div>
      {/* //DEBUT DU FLIGHT//////////////////////////////// */}
      <div className="Flight">
        <Button
          variant="outlined"
          onClick={() => {
            setCounter2(counter2 + 1);
            let tmp = counter.slice();
            tmp.push(0);
            setCounter(tmp);

            let tmp2 = stopover.slice();
            tmp2.push([""]);
            setStopover(tmp2);

            let tmp3 = choice.slice();
            tmp3.push("");
            setChoice(tmp3);

            let tmp4 = departure.slice();
            tmp4.push("");
            setDeparture(tmp3);

            let tmp5 = arrival.slice();
            tmp5.push("");
            setArrival(tmp3);
          }}
        >
          ADD FLIGHT
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            if (counter2 > 0) {
              setCounter2(counter2 - 1);
              let tmp = counter.slice();
              tmp.pop();
              setCounter(tmp);

              let tmp2 = stopover.slice();
              tmp2.pop();
              setStopover(tmp2);
            }
          }}
        >
          REMOVE FLIGHT
        </Button>
      </div>
      {/* //FIN DU FLIGHT//////////////////////////////// */}
      {/* //GIGA LOOP//////////////////////////////// */}
      {all.map((v, k) => {
        return (
          <div key={k}>
            {products && (
              <div className="Formulaire1">
                <FormControl fullWidth>
                  <InputLabel id="">Products</InputLabel>
                  <Select
                    labelId=""
                    id=""
                    value={choice[k]}
                    label="Products"
                    onChange={(e) => {
                      let tmp = choice.slice();
                      tmp[k] = e.target.value;
                      setChoice(tmp);
                    }}
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
                    let tmp = departure.slice();
                    tmp[k] = e.target.value;
                    setDeparture(tmp);
                  }}
                  value={departure[k]}
                  id="outlined-basic"
                  label="Departure"
                  variant="outlined"
                />
              </div>
              <div className="Arrival">
                <TextField
                  onChange={(e) => {
                    let tmp = arrival.slice();
                    tmp[k] = e.target.value;
                    setArrival(tmp);
                  }}
                  value={arrival[k]}
                  id="outlined-basic"
                  label="Arrival"
                  variant="outlined"
                />
              </div>
            </div>
            {/* //PETITE LOOP//////////////////////////////// */}
            {/* ///////////////////////////////////////////// */}
            <div className="Stopover">
              <Button
                variant="outlined"
                onClick={() => {
                  let tmp2 = counter;
                  tmp2[k] += 1;
                  setCounter(tmp2);
                  let tmp = stopover;
                  //console.log("avant", tmp);
                  tmp[k].push("");
                  //console.log("apres", tmp);
                  setStopover(tmp);

                  forceUpdate();
                  // const tmp = [...stopover, ""];
                  // console.log("add", tmp);
                  // setStopover(tmp);
                }}
              >
                ADD STOPOVER
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  if (counter[k] > 0) {
                    // if (counter - 1 == 0) {
                    //   console.log("CA DECONNE ICI");
                    //   setStopover([""]);
                    // } else {}
                    let tmp = stopover.slice();
                    tmp[k] = tmp[k].slice(0, -1);
                    setStopover(tmp);
                    let tmp2 = counter.slice();
                    tmp2[k] -= 1;
                    setCounter(tmp2);
                  }
                }}
              >
                REMOVE STOPOVER
              </Button>
            </div>

            {counter[k] > 0 &&
              [...Array(counter[k])].map((v, m) => {
                console.log("est ce quon revient ici?");
                return (
                  <div className="Stopover" key={m}>
                    <TextField
                      onChange={(e) => {
                        let tmp = stopover.slice();
                        tmp[k][m] = e.target.value;
                        setStopover(tmp);
                      }}
                      value={stopover[k][m]}
                      id="outlined-basic"
                      label="Departure"
                      variant="outlined"
                    />
                  </div>
                );

                ////* FIN PETITE LOOP///////////////////////////// */
              })}
            <div className="Date">
              <DatePicker
                placeholderText="Date Departure"
                isClearable
                selected={startDate[k]}
                selectsStart
                startDate={startDate[k]}
                endDate={endDate[k]}
                onChange={(date) => {
                  let tmp = startDate.slice();
                  tmp[k] = date;
                  setStartDate(tmp);
                }}
              />
              <DatePicker
                placeholderText="Date Arrival"
                isClearable
                selected={endDate[k]}
                selectsEnd
                startDate={startDate[k]}
                endDate={endDate[k]}
                minDate={startDate[k]}
                onChange={(date) => {
                  let tmp = endDate.slice();
                  tmp[k] = date;
                  setEndDate(tmp);
                }}
              />
            </div>
          </div>
        );
      })}
      {/* //GIGA LOOP FIN//////////////////////////////// */}
      <div className="Button">
        <Button
          onClick={async function () {
            let tmpprint = [];
            for (let j = 0; j < counter2; j++) {
              const rawd = await Geocode.fromAddress(departure[j]);
              const data_departure = rawd.results[0].geometry.location;
              console.log("datadeparture", data_departure);

              const rawa = await Geocode.fromAddress(arrival[j]);
              const data_arrival = rawa.results[0].geometry.location;
              console.log("dataarrival", data_arrival);
              let data_stopover = [];
              for (let i = 0; i < stopover[j].length - 1; i++) {
                const raws = await Geocode.fromAddress(stopover[j][i]);
                data_stopover.push(raws.results[0].geometry.location);
                console.log("datastopover", data_stopover[i]);
              }

              console.log("ALLfrontDATA", data_stopover);
              console.log("frontdep", data_departure);
              console.log("frontarr", data_arrival);
              let tmpstart = startDate[j];
              tmpstart.setDate(tmpstart.getDate() + 1);
              let tmpend = endDate[j];
              tmpend.setDate(tmpend.getDate() + 1);
              const response = await fetch("http://localhost:9000/API/flight", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  departure: data_departure,
                  arrival: data_arrival,
                  product: choice[j],
                  startdate: tmpstart,
                  enddate: tmpend,
                  stopover: data_stopover,
                }),
              });
              const responseJson = await response.json();
              console.log(responseJson);
              tmpprint.push(responseJson);
            }
            setAllPrint(tmpprint);
            SetOpenModal(true);
          }}
          variant="contained"
        >
          Submit
        </Button>
        <Modal
          open={openModal}
          onClose={() => {
            SetOpenModal(false);
          }}
        >
          <Box sx={style}>
            {allprint.map((v, k) => {
              console.log("VVVVVVV", v);
              if (v.length == 0) {
                return (
                  <div key={k}>
                    <h1>Flight number {k + 1}</h1>
                    <h2>No data for this flight</h2>
                  </div>
                );
              } else {
                console.log("VVVVVVV2", v);
                console.log("choiceK", choice[k]);
                return (
                  <div key={k}>
                    <h1>Flight number {k + 1}</h1>
                    <h2>Product : {choice[k].name}</h2>
                    <h2>Average product encountered : {v[0].value.average}</h2>
                    <h2>Maximum product encountered : {v[0].value.max}</h2>
                  </div>
                );
              }
            })}
          </Box>
        </Modal>
      </div>
    </div>
  );
}
