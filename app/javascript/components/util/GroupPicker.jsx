import React from "react";
import axios from "axios";
import dropdown from "images/dropdown.svg";
import dropdownBlack from "images/dropdown-black.svg";

export default ({ currentGroup, setCurrentGroup }) => {
  const [groups, setGroups] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [focused, setFocused] = React.useState(false);

  function fetchGroups() {
    axios.get("/group").then((res) => {
      setGroups(res.data.groups);
    });
  }

  React.useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="group-picker">
      <div
        className={
          !currentGroup?.name && !focused
            ? "group-picker-input"
            : "group-picker-input active"
        }
      >
        <input
          placeholder={"Группа"}
          value={currentGroup?.name || search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onFocus={() => {
            setCurrentGroup(null);
            setFocused(true);
          }}
        />
        <img src={!currentGroup?.name && !focused ? dropdownBlack : dropdown} />
      </div>
      {focused && (
        <div className="group-picker-results-wrapper">
          {groups
            .filter((group) => {
              if (search) return RegExp(search, "i").test(group.name);
              else return group;
            })
            .map((group) => {
              return (
                <div
                  key={group.id}
                  className="group-picker-result"
                  onClick={() => {
                    setCurrentGroup(group);
                    setSearch("");
                    setFocused(false);
                  }}
                >
                  {group.name}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
