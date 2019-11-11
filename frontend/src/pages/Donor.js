import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";




class App extends React.Component {

 
  


  constructor(props) {
    super(props);
    this.state = { value: "BloodO" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  Donor() {
    const [name, setName] = useState(-1);
    const [errors, setErrors] = useState([]);
    const [bloodtype, setBloodtype] = useState(null);
    const [loggedIn, setloggedIn] = useState(false);
    const handleChange = e => {
      setName(e.target.value);
    }

    const handleLogin = () => {
    var url = new URL("http://localhost:5000/donor/checkregistered"),
      params = { name: name };
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
  }

  const handleRegister = () => {
    var url = new URL("http://localhost:5000/donor/register"),
      params = { name: name };
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


}

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("Your Blood Type is: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="home">
        <div>
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
        </div>

        <span>
          <form onSubmit={this.handleSubmit}>
            <label>
              Pick Your Blood Type:
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="BloodA">Blood A</option>
                <option value="BloodB">Blood B</option>
                <option value="BloodAB">Blood AB</option>
                <option value="BloodO">Blood O (bens blig is big)</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </span>

        <span>
          <Button variant="primary">Login</Button>
        </span>
        <span>
          <Button variant="primary">Register</Button>
        </span>
      </div>
    );
  }
}

export default App;
