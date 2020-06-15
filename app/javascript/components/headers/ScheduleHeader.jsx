import React from "react";

export default ({ isTeacher, avatar }) => {
  return (
    <div className="header-wrapper">
      <div className="header">
        <a href="/schedule" className="logo">
          QUEUE
        </a>
        <h1>Расписание</h1>
        <div>
          {true && <a>+ Создать пару</a>}
          <img src={avatar} />
        </div>
      </div>
    </div>
  );
};
