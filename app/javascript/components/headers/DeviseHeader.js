import React from "react";

export default ({ title }) => {
  return (
    <div className="header-wrapper">
      <div className="header">
        <a href="/" className="logo">
          QUEUE
        </a>
        <h1>{title}</h1>
      </div>
    </div>
  );
};
