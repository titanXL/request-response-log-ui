import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const Box = styled.div`
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
  min-height: 33vh;
  position: relative;
`;

const BoxHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const BoxBody = styled.div`
  margin: 1rem;
`;

const InputContainer = styled.div`
  flex: 1;
  margin-left: 1rem;
  div:first-child {
    width: 100%;
    margin-top: 2px;
  }
`;

const StyledSelect = styled(Select)`
  align-self: flex-end;
  margin-left: 1rem;
`;

const TextAreaContainer = styled.div`
  padding: 0 1rem;
  margin-top: 1rem;
  textarea {
    width: 100%;
  }
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingOverlay = ({ children }) => <Overlay>{children}</Overlay>;

export default () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState({});
  const [requestBody, setRequestBody] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchResource = () => {
    const data = JSON.stringify(requestBody);
    setLoading(true);
    axios({
      url,
      method,
      data
    })
      .then(response => {
        setResponse(response);
        setLoading(false);
      })
      .catch(e => {
        alert(e);
        setLoading(false);
      });
  };

  const handleSetMethod = e => setMethod(e.target.value);
  const handleSetUrl = e => setUrl(e.target.value);
  const handleSetRequestBody = e => setRequestBody(e.target.value);

  return (
    <Box className="box">
      {loading && (
        <LoadingOverlay>
          <CircularProgress />
        </LoadingOverlay>
      )}
      <BoxHeader>
        <StyledSelect
          labelId="method-select"
          id="method-select"
          value={method}
          onChange={handleSetMethod}
        >
          <MenuItem value="GET">GET</MenuItem>
          <MenuItem value="POST">POST</MenuItem>
          <MenuItem value="PATCH">PATCH</MenuItem>
        </StyledSelect>
        <InputContainer>
          <TextField
            id="standard-basic"
            label="URL"
            onChange={handleSetUrl}
            value={url}
          />
        </InputContainer>
        <Fab color="primary" aria-label="go" onClick={fetchResource}>
          <ArrowForwardIcon />
        </Fab>
      </BoxHeader>
      <TextAreaContainer>
        Request Body
        <textarea
          value={requestBody}
          onChange={handleSetRequestBody}
          rows="5"
        />
      </TextAreaContainer>
      <BoxBody>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </BoxBody>
    </Box>
  );
};
