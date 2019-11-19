import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const mystyle = {
  color: "white",
  backgroundColor: "black",
  padding: "20px",
  fontFamily: "Helvetica",
  fontWeight: "bold"
};
const mystyle2 = {
  color: "white",
  backgroundColor: "blue",
  padding: "20px",
  fontFamily: "Helvetica",
  fontWeight: "bold"
};

const mystyle3 = {
  color: "white",
  backgroundColor: "silver",
  padding: "20px",
  fontFamily: "Helvetica",
  fontWeight: "bold"
};

function Home(props) {
  const navigator = url => () => {
    props.history.push(url);
  };

  return (
    <div className="home">
      <ButtonGroup size="lg">
        <Button style={mystyle} onClick={navigator("batmobile")}>
          Batmobile
        </Button>
        <Button style={mystyle2} onClick={navigator("donor")}>
          Donor
        </Button>
        <Button style={mystyle3} onClick={navigator("hospital")}>
          Hospital
        </Button>
      </ButtonGroup>
      <div>
        <p style={{ fontWeight: "bold" }}>
          <br />
          Welcome To Project Vampire <br />
          Vampire Pty Ltd's job is to manage all blood supplies. <br /> We
          recieve your information and deliver deposits of blood to requesting
          facilities who need it. <br /> Follow instructions below:
          <br />
        </p>
        <p>
          <br />
          To Login or Register a Donor please Click 'Donor'. <br />
          To Login or Register as a Batmobile please Click 'Batmobile'.
          <br />
          To Login or Register as a Hospital please click 'Hospital'. <br />
        </p>
      </div>
    </div>
  );
}

export default Home;
