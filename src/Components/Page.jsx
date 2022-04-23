import React from "react";
import InternationalIndex from "./InternationalIndex/InternationalIndex";
import { Divider, Box } from "@chakra-ui/react";
import "./Page.css";
import SearchResultIndex from "./SearchResultIndex/SearchResultIndex";
function Page() {
  return (
    <div className="ContainerDiv">

      
      
      <Box minH={1000} minW="100%" maxW="100%">
        <section style={{ marginBottom: "10px" }}>
          <InternationalIndex />
        </section >

        <Divider style={{marginTop:'50px'}} height="10px" orientation="horizontal" />

        <section style={{ marginTop: "40px" }}>
          <SearchResultIndex />
        </section>
        
      </Box>
        <footer >
          <h4 style={{marginLeft:'auto'}}>made by : Shahid Rawther</h4>
        </footer>
      
    </div>
  );
}

export default Page;
