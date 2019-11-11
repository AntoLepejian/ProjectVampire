import React, { useState } from "react";
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
        <span>
        <select>
          <option value="bloodA">antos Blig</option>
          <option value="bloodB">bens Blig</option>
          <option value="bloodAB"> rez's Blig</option>
          <option value="bloodO">Zacks Blig</option>
        </select>  
      </span>
        <Button variant="primary">Login</Button>
      </span>
      <span>
        <Button variant="primary">Register</Button>
      </span>
    </div>
  );
}

export default App;
