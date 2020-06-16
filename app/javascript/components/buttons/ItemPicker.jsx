import React from "react";

export default ({ value, setItem, label, active }) => {
  return (
    <div
      className={active ? "item-picker active" : "item-picker"}
      onClick={() => setItem(value)}
    >
      {label}
    </div>
  );
};
