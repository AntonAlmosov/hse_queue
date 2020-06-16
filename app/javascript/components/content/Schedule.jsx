import React from "react";

import { getWeekDay } from "../../misc/getWeekDay";
import { getTime } from "../../misc/getTime";

export default ({ schedule }) => {
  return (
    <div className="calendar-wrapper">
      {schedule.map((lessons, i) => {
        return <CalendarColumn key={i} lessons={lessons} i={i} />;
      })}
    </div>
  );
};

const CalendarColumn = ({ lessons, i }) => {
  return (
    <div className="calendar-column">
      <div className="calendar-column-header">
        <h3>{getWeekDay(i)}</h3>
        <h4>{String(15 + i) + ".06"}</h4>
        <hr />
      </div>
      {lessons.map((lesson) => {
        return <LessonCard key={lesson.id} lesson={lesson} />;
      })}
    </div>
  );
};

const LessonCard = ({ lesson }) => {
  return (
    <a href={lesson.url} className="lesson-card">
      <h3>{lesson.name}</h3>
      <h4>{lesson.user.name}</h4>
      <hr />
      <div className="captions">
        <span>{getTime(lesson.time)}</span>
        <span>{lesson.classroom}</span>
      </div>
    </a>
  );
};
