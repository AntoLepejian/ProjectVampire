import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

function App() {
  return (
    <div className="home">
      <span>
        {" "}
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </span>
      <span>
        <p>Not registered yet?</p>
        <Button variant="primary" style={{ margin: "0 auto" }}>
          Register
        </Button>
      </span>
    </div>
  );
}

export default App;
