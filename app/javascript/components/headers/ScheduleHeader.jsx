import React from "react";

export default ({ isTeacher, avatar, title }) => {
  return (
    <div className="header-wrapper">
      <div className="header">
        <a href="/schedule" className="logo">
          QUEUE
        </a>
        <h1>{title}</h1>
        <div>
          {isTeacher && <a href="/lesson/new">+ Создать пару</a>}
          <img src={avatar} />
        </div>
      </div>
    </div>
  );
};
