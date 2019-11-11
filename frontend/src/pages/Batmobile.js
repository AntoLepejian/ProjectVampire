import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";
import Bargraph from "../components/Bargraph";

function Batmobile() {
  const [carid, setCarid] = useState(-1);
  const [errors, setErrors] = useState([]);
  const [bloodtype, setBloodtype] = useState("A+");
  const [loggedIn, setloggedIn] = useState(false);
  const handleChange = e => {
    setCarid(e.target.value);
  };

  const handleLogin = () => {
    var url = new URL("http://localhost:5000/batmobile/checkregistered"),
      params = { carid: carid };
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
        } else {
          setErrors([
            ...errors,
            "No account found, You have to register first"
          ]);
        }
      });
  };

  const handleRegister = () => {
    var url = new URL("http://localhost:5000/batmobile/register"),
      params = { carid: carid };
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
          setloggedIn(true);
        } else {
          setErrors([...errors, "Already registered, try Login?"]);
        }
      });
  };

  const fetchBatMobileData = () => {
    var url = new URL("http://localhost:5000/batmobile/query"),
      params = { carid: carid };
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
        } else {
          setErrors([...errors, "something went wrong"]);
        }
      });
  };

  const handleCollectBlood = () => {
    var url = new URL("http://localhost:5000/blood/collect"),
      params = { carid: carid, bloodtype: bloodtype };
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
        } else {
          setErrors([...errors, res.msg]);
        }
      });
  };

  const handleScreenBlood = () => {
    var url = new URL("http://localhost:5000/blood/screen"),
      params = { carid: carid };
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
        } else {
          setErrors([...errors, res.msg]);
        }
      });
  };

  return (
    <div className="home">
      {errors.map((err, id) => (
        <Alert key={id} variant="danger">
          {err}
        </Alert>
      ))}
      {!loggedIn && (
        <div>
          <span>
            {" "}
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="carid"
                placeholder="Car ID"
                aria-label="Car ID"
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
          <h3>Batmobile ID: {carid}</h3>
          <Bargraph />
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
          <Button onClick={handleCollectBlood} variant="primary">
            Collect Blood
          </Button>{" "}
          <span>
            <Button onClick={handleScreenBlood} variant="primary">
              Screen all Bloods
            </Button>
          </span>
        </div>
      )}
    </div>
  );
}

export default Batmobile;
