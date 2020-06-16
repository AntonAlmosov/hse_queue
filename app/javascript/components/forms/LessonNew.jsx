import React from "react";
import axios from "axios";

import { getWeekDay } from "../../misc/getWeekDay";
import { getTime } from "../../misc/getTime";
import GroupPicker from "../util/GroupPicker";
import DefaultButton from "../buttons/DefaultButton";
import ItemPicker from "../buttons/ItemPicker";

export default () => {
  const [name, setName] = React.useState("");
  const [weekday, setWeekday] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [group, setGroup] = React.useState(null);
  const [buttonText, setButtonText] = React.useState("Создать");
  const [classroom, setClassroom] = React.useState("");

  const handleFormSubmission = () => {
    setButtonText("Обработка...");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("weekday", weekday);
    formData.append("time", time);
    formData.append("group", group.id);
    formData.append("classroom", classroom);

    axios
      .post("/lesson", formData)
      .then((res) =>
        window.location.replace(res.data.redirect_path || "/lesson/new")
      );
  };

  return (
    <div className="lesson-form-wrapper">
      <input
        className="lesson-name"
        placeholder={"Название дисциплины"}
        onChange={(e) => setName(e.target.value)}
        autoComplete={"false"}
      />
      {weekday != null && (
        <div className={time ? "picked-data completed" : "picked-data"}>
          {weekday != null && (
            <ItemPicker
              value={weekday}
              setItem={() => {
                setWeekday(null);
                setTime(null);
              }}
              label={getWeekDay(weekday)}
              active
            />
          )}
          {time && (
            <ItemPicker
              value={weekday}
              setItem={() => {
                setTime(null);
              }}
              label={getTime(time)}
              active
            />
          )}
        </div>
      )}
      {weekday == null && <WeekdayPicker setWeekday={setWeekday} />}
      {weekday != null && !time && <TimePicker setTime={setTime} />}
      {weekday != null && time && (
        <GroupPicker currentGroup={group} setCurrentGroup={setGroup} />
      )}
      {group && (
        <input
          className="classroom"
          onChange={(e) => setClassroom(e.target.value)}
          value={classroom}
          placeholder={"Аудитория"}
          autoComplete={"false"}
        />
      )}
      {weekday != null && name && time && group && classroom && (
        <DefaultButton
          buttonLabel={buttonText}
          onClick={handleFormSubmission}
        />
      )}
    </div>
  );
};

const WeekdayPicker = ({ setWeekday }) => {
  return (
    <div className="weekday-picker-wrapper">
      <ItemPicker value={0} setItem={setWeekday} label={getWeekDay(0)} />
      <ItemPicker value={1} setItem={setWeekday} label={getWeekDay(1)} />
      <ItemPicker value={2} setItem={setWeekday} label={getWeekDay(2)} />
      <ItemPicker value={3} setItem={setWeekday} label={getWeekDay(3)} />
      <ItemPicker value={4} setItem={setWeekday} label={getWeekDay(4)} />
      <ItemPicker value={5} setItem={setWeekday} label={getWeekDay(5)} />
    </div>
  );
};

const TimePicker = ({ setTime }) => {
  return (
    <div className="time-picker-wrapper">
      <div className="row">
        <ItemPicker value={900} setItem={setTime} label={getTime(900)} />
        <ItemPicker value={1030} setItem={setTime} label={getTime(1030)} />
        <ItemPicker value={1210} setItem={setTime} label={getTime(1210)} />
        <ItemPicker value={1340} setItem={setTime} label={getTime(1340)} />
        <ItemPicker value={1510} setItem={setTime} label={getTime(1510)} />
        <ItemPicker value={1640} setItem={setTime} label={getTime(1640)} />
      </div>
      <div className="row second">
        <ItemPicker value={1810} setItem={setTime} label={getTime(1810)} />
        <ItemPicker value={1940} setItem={setTime} label={getTime(1940)} />
      </div>
    </div>
  );
};
