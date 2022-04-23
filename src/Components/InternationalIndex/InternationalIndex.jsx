import React, { useState, useEffect, Fragment } from "react";
import "./InternationalIndex.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";
import CountUp from "react-countup";

function InternationalIndex() {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;


  let [loadingData, setLoadingData] = useState(false);
  const [interData, setInterData] = useState([]);

  function getCurrentDate() {
    let dateObj = new Date();
    let month = String(dateObj.getMonth() + 1).padStart(2, "0");
    let day = String(dateObj.getDate()).padStart(2, "0");
    let year = dateObj.getFullYear();
    let output = year + "-" + month + "-" + day;
    return output;
  }

  const options = {
    url: "https://api.covid19api.com/summary",
    method: "GET",
  };

  async function getData() {
    const response = await axios.request(options);

    setInterData(response.data.Global);
  }

  useEffect(() => {
    getCurrentDate();
    setLoadingData(true);
    getData();
    setTimeout(() => {
      setLoadingData(false);
    }, 500);
  }, []);

  return (
    <React.Fragment>
      <div className="row">
        <center>
          <div className="title">
            <h1>
              
              <span style={{ color: "red" }}>Covid_19</span> World Wide Data
            </h1>
          </div>
        </center>
        {loadingData ? (
          <RingLoader />
        ) : (
          <Fragment>
            <Card className=" internationalCard col-5 col-md-5 col-lg-2  ">
              <Card.Body style={{ textAlign: "center" }}>
                <br />
                <Card.Title style={{ color: "green" }}>
                  <CountUp start={0} end={interData.NewConfirmed} />
                </Card.Title>
                <br />
                <Card.Title className="mb-2 text-muted">
                  Active Cases
                </Card.Title>
              </Card.Body>
            </Card>

            <Card className="internationalCard  col-5 col-md-5 col-lg-2   ">
              <Card.Body style={{ textAlign: "center" }}>
                <br />
                <Card.Title style={{ color: "green" }}>
                  <CountUp start={0} end={interData.NewDeaths} />
                </Card.Title>
                <br />
                <Card.Title className="mb-2 text-muted">New Deaths</Card.Title>
              </Card.Body>
            </Card>

            <Card className="internationalCard col-5 col-md-5 col-lg-2   ">
              <Card.Body style={{ textAlign: "center" }}>
                <br />
                <Card.Title style={{ color: "green" }}>
                  <CountUp start={0} end={interData.TotalConfirmed} />
                </Card.Title>
                <br />
                <Card.Title className="mb-2 text-muted">Confirmed</Card.Title>
              </Card.Body>
            </Card>

            <Card className="internationalCard col-5  col-md-5 col-lg-2  ">
              <Card.Body style={{ textAlign: "center" }}>
                <br />
                <Card.Title style={{ color: "green" }}>
                  <CountUp start={0} end={interData.TotalDeaths} />
                </Card.Title>
                <br />
                <Card.Title className="mb-2  text-muted">Deaths</Card.Title>
              </Card.Body>
            </Card>
          </Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default InternationalIndex;
