import React, { useState, useEffect } from "react";
import "./SearchResultIndex.css";
import { Card } from "react-bootstrap";
import { Box, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import LineGraph from "../LineGraph";
import { Fade } from "react-awesome-reveal";

function SearchResultIndex() {
  const [selectedProvince, setSelectedProvince] = useState(["Country"]);
  const [provinceNames, setProvinceNames] = useState([]);
  const [provinceData, setProvinceData] = useState([]);
  const [smallView, setsmallView] = useState(false);
  

  function getCurrentDate() {
    let dateObj = new Date();
    let month = String(dateObj.getMonth() + 1).padStart(2, "0");
    let day = String(dateObj.getDate()).padStart(2, "0");
    let year = dateObj.getFullYear();
    let output = year + "-" + month + "-" + day;
    
    return output;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const getProvinceNameOptions = {
    method: "GET",
    url: "https://covid-19-statistics.p.rapidapi.com/provinces",
    params: { iso: "IND" },
    headers: {
      "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
      "X-RapidAPI-Key": "fbdff7e1bdmsh0d25a8cd1b29338p1ee46bjsn8d137e63eddc",
    },
  };

  useEffect(() => {
    if (window.innerWidth < 500) {
      setsmallView(true);
    } else {
      setsmallView(false);
    }
    getCurrentDate();
    axios
      .request(getProvinceNameOptions)
      .then((response) => {
      
        setProvinceNames(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

 

  let marginTopVar = "0";
  {
    smallView ? (marginTopVar = "1.5rem") : (marginTopVar = "0");
  }

  const options = {
    method: "GET",
    url: "https://covid-19-statistics.p.rapidapi.com/reports",
    params: {
      region_province: selectedProvince,
      iso: "IND",
      date: getCurrentDate().output,
    },
    headers: {
      "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
      "X-RapidAPI-Key": "fbdff7e1bdmsh0d25a8cd1b29338p1ee46bjsn8d137e63eddc",
    },
  };

  // get data according to country names provided to options
  const getData = () => {
    axios
      .request(options)
      .then((response) => {
        console.log(response.data.data);
        setProvinceData(response.data.data[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
    
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Box>
        <center>
          <div className="titleTwoDiv">
           <h1 className="titleTwo">
               INDIA 
            </h1> 
          </div>
        </center>

        <section className="bottomSec">
          <div className="leftSide">
     
            <LineGraph to={getCurrentDate().output} />
          </div>

          <div className="rightSide">
          

            <div
              style={{ marginBottom: "3%", marginTop: marginTopVar }}
              className="search"
            >
              <form className="searchForm" onSubmit={handleSubmit}>
                {smallView ? (
                  <center className="formCenterFunc">
                    <select
                      className="select-box"
                      style={{
                        border: "2px solid",
                        borderRadius: "0.5rem",
                        maxWidth: "80%",
                        overflowY: "auto",
                      }}
                      
                      type="text"
                     
                      onChange={(e) => setSelectedProvince(e.target.value)}
                    >
                      <option>Select State/Province</option>
                      {provinceNames &&
                        provinceNames.map((obj, index) => (
                          <option key={index} value={obj.province}>
                            {obj.province}
                          </option>
                        ))}
                    </select>

                    <button type="submit" className="button-17" role="button">
                      search
                    </button>
                  </center>
                ) : (
                  <>
                    <select
                      className="select-box"
                      style={{
                        border: "2px solid",
                        borderRadius: "0.5rem",
                        maxWidth: "80%",
                        overflowY: "auto",
                      }}
                      type="text"
                      
                      onChange={(e) => setSelectedProvince(e.target.value)}
                    >
                      <option>Select State/Province</option>
                      {provinceNames &&
                        provinceNames.map((obj, index) => (
                          <option key={index} value={obj.province}>
                            {obj.province}
                          </option>
                        ))}
                    </select>

                    <button type="submit" className="button-17" role="button">
                      search
                    </button>
                  </>
                )}
              </form>
            </div>
            <SimpleGrid
              columns={2}
              spacing={20}
              spacingY="68px"
              minChildWidth="150px"
            >
              
                
                <Box
                  bg="rgb(255,255,255)"
                  className="bottomBoxes"
                  height="150px"
                >
                  <Card.Body style={{ textAlign: "center" }}>
                    
                    <br />
                    <Card.Title style={{ color: "green" }}>
                      {provinceData.active}
                    </Card.Title>
                    <br />
                    <Card.Title className="mb-2 text-muted">
                      Active Cases
                    </Card.Title>
                  </Card.Body>
                </Box>
                
              
            
              <Box bg="rgb(255,255,255)" className="bottomBoxes" height="150px">
                <Card.Body style={{ textAlign: "center" }}>
                  <br />
                  <Card.Title style={{ color: "green" }}>
                    {provinceData.deaths}
                  </Card.Title>
                  <br />
                  <Card.Title className="mb-2 text-muted">Deaths</Card.Title>
                </Card.Body>
              </Box>
              
              
             
              <Box bg="rgb(255,255,255)" className="bottomBoxes" height="150px">
                <Card.Body style={{ textAlign: "center" }}>
                  <br />
                  <Card.Title style={{ color: "green" }}>
                    {provinceData.confirmed}
                  </Card.Title>
                  <br />
                  <Card.Title className="mb-2 text-muted">Confirmed</Card.Title>
                </Card.Body>
              </Box>
             
              
              <Box bg="rgb(255,255,255)" className="bottomBoxes" height="150px">
                <Card.Body style={{ textAlign: "center" }}>
                  <br />
                  <Card.Title style={{ color: "green" }}>
                    {provinceData.confirmed_diff}
                  </Card.Title>
                  <br />
                  <Card.Title className="mb-2 text-muted">
                    Confirmed Diff.
                  </Card.Title>
                </Card.Body>
              </Box>
              

             
              <Box bg="rgb(255,255,255)" className="bottomBoxes" height="150px">
                <Card.Body style={{ textAlign: "center" }}>
                  <br />
                  <Card.Title style={{ color: "green" }}>
                    {provinceData.recovered}
                  </Card.Title>
                  <br />
                  <Card.Title className="mb-2 text-muted">Recovered</Card.Title>
                </Card.Body>
              </Box>
              

              
              <Box bg="rgb(255,255,255)" className="bottomBoxes" height="150px">
                <Card.Body style={{ textAlign: "center" }}>
                  <br />
                  <Card.Title style={{ color: "green" }}>
                    {provinceData.fatality_rate}
                  </Card.Title>{" "}
                  <br />
                  <Card.Title className="mb-2 text-muted">
                    Fatality Rate
                  </Card.Title>
                </Card.Body>
              </Box>
              
            </SimpleGrid>
          </div>
        </section>
      </Box>
    </div>
  );
}

export default SearchResultIndex;
