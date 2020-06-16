import React from "react";

export default ({ buttonLabel, onClick }) => {
  return (
    <div className="default-button" onClick={onClick}>
      {buttonLabel}
    </div>
  );
};
