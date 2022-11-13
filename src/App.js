import React from "react";
import Navbar from "./Components/navbar";
import Table from "./Components/table";
import About from "./Components/about";

function App() {
  return (
    <div className="h-screen relative bg-[url('./Images/bg-image4.jpg')] backdrop-blur-sm">
      <Navbar/>
      <Table />
    </div>
  );
}

export default App;
