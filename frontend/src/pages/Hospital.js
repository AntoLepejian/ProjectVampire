import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";
import Bargraph from "../components/Bargraph";

function Hospital() {
  const [hospitalName, setHospitalName] = useState("");
  const [errors, setErrors] = useState([]);
  const [amount, setAmount] = useState(100);
  const [screened, setScreened] = useState([]);
  const [unscreened, setUnscreened] = useState([]);
  const [bloodtype, setBloodtype] = useState("A+");
  const [loggedIn, setloggedIn] = useState(false);

  const handleChangeAmount = e => {
    setAmount(parseInt(e.target.value));
  };

  const handleChange = e => {
    setHospitalName(e.target.value);
  };

  const handleLogin = () => {
    var url = new URL("http://localhost:5000/hospital/checkregistered"),
      params = { name: hospitalName };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === "registered") {
          setErrors([]);
          setloggedIn(true);
          getHospitalData();
        } else {
          setErrors([
            ...errors,
            "No account found, You have to register first"
          ]);
        }
      });
  };

  const handleRegister = () => {
    var url = new URL("http://localhost:5000/hospital/register"),
      params = { name: hospitalName };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.value === "success") {
          setErrors([]);
          setloggedIn(true);
          getHospitalData();
        } else {
          setErrors([...errors, "Already registered, try Login?"]);
        }
      });
  };

  const getBlood = (res, screenOrUnscreened) => {
    let bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    let result = [];

    bloodTypes.forEach((type, i) => {
      result.push(
        res["blood_" + type][screenOrUnscreened].reduce(function(
          total,
          currentValue,
          currentIndex
        ) {
          return (total += currentValue.blood_amount);
        },
        0)
      );
    });

    console.log(result);
    return result;
  };

  const getHospitalData = () => {
    var url = new URL("http://localhost:5000/hospital/query"),
      params = { name: hospitalName };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res !== {}) {
          console.log(res);
          let screenedBlood = getBlood(res, "screened");
          let unscreenedBlood = getBlood(res, "unscreened");
          setScreened(screenedBlood);
          setUnscreened(unscreenedBlood);
        } else {
          setErrors([...errors, "something went wrong"]);
        }
      });
  };

  const handleRequestBlood = () => {
    var url = new URL("http://localhost:5000/blood/request"),
      params = { name: hospitalName, bloodtype, amount };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.value === "success") {
          // TODO
          // fetch new blood levels
          setErrors([]);
          getHospitalData();
        } else if (res.value === "partial-success") {
          console.log(res);
          getHospitalData();
          setErrors([res.msg]);
        } else {
          console.log(res);
          setErrors([res.msg]);
        }
      });
  };

  const handleCleanBloods = () => {
    var url = new URL("http://localhost:5000/hospital/removeexpired"),
      params = { name: hospitalName };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.value === "success") {
          // fetch new blood levels
          setErrors([]);
          getHospitalData();
        } else {
          console.log(res);
          setErrors([res.msg]);
        }
      });
  };

  return (
    <div className="home">
      {errors.map((err, id) => (
        <Alert key={id} variant="danger" style={{ width: "800px" }}>
          {err}
        </Alert>
      ))}
      {!loggedIn && (
        <div>
          <span>
            {" "}
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Hospital</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="hospitalName"
                placeholder="Hospital Name"
                aria-label="Hospital Name"
                onChange={handleChange}
              />
            </InputGroup>
          </span>
          <span>
            <Button onClick={handleLogin} variant="primary">
              Login
            </Button>{" "}
            <Button onClick={handleRegister} variant="primary">
              Register
            </Button>
          </span>
        </div>
      )}
      {loggedIn && (
        <div>
          <h3>Hospital Name: {hospitalName}</h3>
          <Bargraph screened={screened} unscreened={unscreened} />
          <select
            value={bloodtype}
            onChange={event => {
              setBloodtype(event.target.value);
            }}
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>{" "}
          <InputGroup className="mb-3" style={{ padding: "10px 0" }}>
            <FormControl
              placeholder="Blood Amount"
              aria-label="Blood Amount"
              aria-describedby="basic-addon2"
              type="number"
              min="1"
              max="2000"
              value={amount}
              onChange={handleChangeAmount}
            />
            <InputGroup.Append>
              <InputGroup.Text id="basic-addon2">mL</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>{" "}
          <Button onClick={handleRequestBlood} variant="primary">
            Request Blood
          </Button>{" "}
          <Button onClick={handleCleanBloods} variant="primary">
            Remove Expired Bloods
          </Button>{" "}
        </div>
      )}
    </div>
  );
}

export default Hospital;
