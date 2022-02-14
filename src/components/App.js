import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";
import "./App.scss";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <Layout />
    </>
  );
}

export default App;
