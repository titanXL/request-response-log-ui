import React, { useState } from "react";
import styled from "styled-components";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

import Box from "./Box";

const Container = styled.div`
  margin: 1rem;
  display: grid;
  grid-gap: 1.2rem;
  grid-template-columns: repeat(2, 1fr);
`;

const StyledFab = styled(Fab)`
  position: fixed !important;
  bottom: 3rem;
  right: 3rem;
  left: auto;
  top: auto;
`;

const PaddedAppbar = styled(AppBar)`
  padding: 0.5rem;
`;

function App() {
  const [boxes, addBox] = useState([{}]);

  return (
    <>
      <PaddedAppbar position="static">
        <Typography variant="h6">Response checker</Typography>
      </PaddedAppbar>
      <Container>
        <StyledFab
          color="primary"
          aria-label="add"
          onClick={() => addBox(oldBoxes => [...oldBoxes, { id: Date.now() }])}
        >
          <AddIcon />
        </StyledFab>
        {boxes.map((box, index) => {
          return <Box key={index} />;
        })}
      </Container>
    </>
  );
}

export default App;
