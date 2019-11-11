import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

function Batmobile() {
  const [carid, setCarid] = useState(-1);
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
      .then(res => console.log(res));
  };

  const handleRegister = () => {
    var url = new URL("http://localhost:5000/batmobile/register"),
      params = { carid: carid };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    fetch(url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };
  return (
    <div className="home">
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
  );
}

export default Batmobile;
