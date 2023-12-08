import React from "react";
import "./loadingSpinner.css";

//Loading message used by components that fetch API data

function LoadingSpinner() {
  return (
      <div className="LoadingSpinner">
        Loading ...
      </div>
  );
}

export default LoadingSpinner;