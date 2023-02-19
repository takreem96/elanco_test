import * as React from "react";
import Button from "@mui/material/Button";
import Navbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer";
import CloudCostingPage from "./Components/CloudCostingPage";
export default function App() {
  return (
    <div>
      <Navbar />
      <Footer />
      <CloudCostingPage/>
    </div>
  );
}
