import React from "react";

export default () => {
  const schedule = [
    [
      {
        id: 1,
        url: "/lesson/1",
        name: "Кураторские дисцицлины",
        teacher: "Захар День",
        time: "18:00",
        classroom: "365 ауд.",
      },
      {
        id: 2,
        url: "/lesson/1",
        name: "Кураторские дисцицлины",
        teacher: "Захар День",
        time: "18:00",
        classroom: "365 ауд.",
      },
    ],
    [],
    [],
    [
      {
        id: 2,
        url: "/lesson/1",
        name: "Кураторские дисцицлины",
        teacher: "Захар День",
        time: "18:00",
        classroom: "365 ауд.",
      },
    ],
    [],
    [],
  ];
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
      <h4>{lesson.teacher}</h4>
      <hr />
      <div className="captions">
        <span>{lesson.time}</span>
        <span>{lesson.classroom}</span>
      </div>
    </a>
  );
};

const getWeekDay = (i) => {
  switch (i) {
    case 0:
      return "Пн";
    case 1:
      return "Вт";
    case 2:
      return "Ср";
    case 3:
      return "Чт";
    case 4:
      return "Пт";
    case 5:
      return "Сб";
  }
};
