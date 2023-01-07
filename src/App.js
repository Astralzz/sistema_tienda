import logo from "./logo.svg";
import "./App.css";
import React from "react";
import PageRoutes from "./routes/PageRoutes";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    //Pagina principal
    <div className="App">
      <PageRoutes />
    </div>
  );
}

export default App;
