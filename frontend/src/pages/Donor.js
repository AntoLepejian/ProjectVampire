import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bloodtype: "A+",
      name: "",
      loggedIn: false,
      errors: [],
      last_collected: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleLogin = () => {
    var url = new URL("http://localhost:5000/donor/checkregistered"),
      params = { name: this.state.name };
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
        if (res.status === "registered") {
          this.setState({ loggedIn: true, errors: [] });
          this.getDonorData();
        } else {
          this.setState(prevState => ({
            errors: [
              ...prevState.errors,
              "No account found, You have to register first"
            ]
          }));
        }
      });
  };

  handleRegister = () => {
    var url = new URL("http://localhost:5000/donor/register"),
      params = { name: this.state.name, bloodtype: this.state.bloodtype };
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
          this.setState({ loggedIn: true, errors: [] });
          this.getDonorData();
        } else {
          this.setState(prevState => ({
            errors: [...prevState.errors, "Already registered, try Login?"]
          }));
        }
      });
  };

  handleChange(event) {
    this.setState({ bloodtype: event.target.value });
  }

  getDonorData = () => {
    var url = new URL("http://localhost:5000/donor/query"),
      params = { name: this.state.name };
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
          this.setState({ ...res });
        } else {
          this.setState(prevState => ({
            errors: [...prevState.errors, "something went wrong"]
          }));
        }
      });
  };

  render() {
    return (
      <div className="home">
        {this.state.errors.map((err, id) => (
          <Alert key={id} variant="danger">
            {err}
          </Alert>
        ))}

        {!this.state.loggedIn && (
          <div>
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
                    onChange={event => {
                      this.setState({ name: event.target.value });
                    }}
                  />
                </InputGroup>
              </span>
            </div>
            <span>
              <label>
                Pick Your Blood Type:{" "}
                <select value={this.state.value} onChange={this.handleChange}>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </label>
            </span>{" "}
            <span>
              <Button variant="primary" onClick={this.handleLogin}>
                Login
              </Button>
            </span>{" "}
            <span>
              <Button variant="primary" onClick={this.handleRegister}>
                Register
              </Button>
            </span>
          </div>
        )}

        {this.state.loggedIn && (
          <div>
            <h3>
              Hello {this.state.name}, Your blood type is {this.state.bloodtype}{" "}
              and you last donated:{" "}
              {this.state.last_collected === 0 ? (
                "Never"
              ) : (
                <p>{new Date(this.state.last_collected).toDateString()}</p>
              )}
            </h3>
          </div>
        )}
      </div>
    );
  }
}

export default App;
