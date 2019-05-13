import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";

import {
  Typography,
  Toolbar,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  CircularProgress
} from "@material-ui/core";

import { CloudDone } from "@material-ui/icons";

import "./styles.css";

const App = () => {
  const [gateway, setGateway] = useState("https://ipfs.io");
  const [hash, setHash] = useState("");

  const [result, setResult] = useState();

  const setStatus = (result, hash, status) => {
    result[hash] = status;
    setResult({ ...result });
  };

  const ls = async (gateway, hash, result) => {
    setStatus(result, hash, "loading");
    const res = await fetch(`${gateway}/api/v0/ls/${hash}`);
    setStatus(result, hash, "loaded");
    const json = await res.json();
    json["Objects"][0]["Links"].forEach(link =>
      ls(gateway, link["Hash"], result)
    );
  };

  const loadAll = useCallback(() => {
    ls(gateway, hash, {});
  }, [gateway, hash]);

  const loaded =
    result && Object.values(result).filter(it => it === "loaded").length;

  return (
    <div
      style={{
        margin: "auto",
        maxWidth: 600,
        height: "70vh",
        marginTop: "20vh"
      }}
    >
      <Toolbar>
        <Typography
          color="primary"
          align="center"
          variant="h3"
          children="InterPlanetary Fetcher"
        />
      </Toolbar>
      <Toolbar>
        <Typography
          align="center"
          variant="h6"
          children="Fetch all resources of a hash to any gateway"
        />
      </Toolbar>
      <Toolbar>
        <TextField
          fullWidth
          label="Gateway"
          value={gateway}
          onChange={e => setGateway(e.target.value)}
        />
      </Toolbar>
      <div style={{ marginBottom: 4 }} />
      <Toolbar>
        <TextField
          fullWidth
          label="Hash"
          placeholder="Qm..."
          value={hash}
          onChange={e => setHash(e.target.value)}
        />
      </Toolbar>
      <div style={{ marginBottom: 8 }} />
      <Toolbar>
        <Button
          fullWidth
          disabled={!hash}
          color="primary"
          variant="contained"
          children="fetch"
          onClick={loadAll}
        />
      </Toolbar>
      {result && (
        <div>
          <div style={{ marginBottom: 16 }} />
          <Divider />
          <div style={{ marginBottom: 16 }} />
          <Typography
            fullWidth
            children={`Fetched ${loaded}/${
              Object.keys(result).length
            } resources`}
            variant="h6"
            align="center"
          />

          {Object.entries(result).map(([hash, status], i) => (
            <Toolbar key={i}>
              <a
                style={{ flex: 1, overflow: "hidden" }}
                href={`${gateway}/ipfs/${hash}`}
                target="_blank"
                children={
                  <Typography
                    style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    color="primary"
                    variant="h6"
                    children={<b>{hash}</b>}
                  />
                }
              />
              <div style={{ marginRight: 8 }} />
              {status === "loading" ? (
                <CircularProgress size={20} />
              ) : (
                <CloudDone color="primary" />
              )}
            </Toolbar>
          ))}
        </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
