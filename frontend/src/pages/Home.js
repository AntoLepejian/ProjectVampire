import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

function Home(props) {
  const navigator = url => () => {
    props.history.push(url);
  };
  return (
    <div className="home">
      <ButtonGroup size="lg">
        <Button onClick={navigator("batmobile")}>Batmobile</Button>
        <Button onClick={navigator("donor")}>Donor</Button>
        <Button onClick={navigator("hospital")}>Hospital</Button>
      </ButtonGroup>
    </div>
  );
}

export default Home;
