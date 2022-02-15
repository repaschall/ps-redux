import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/react-toastify.bootstrap.scss";
import "./App.scss";
import Layout from "./Layout";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <Layout />
    </>
  );
}

export default App;
