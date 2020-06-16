import React from "react";
import axios from "axios";

import ImagePicker from "../util/ImagePicker";
import GroupPicker from "../util/GroupPicker";
import DefaultButton from "../buttons/DefaultButton";
import ItemPicker from "../buttons/ItemPicker";

export default ({ initialButtonText }) => {
  const [avatar, setAvatar] = React.useState(null);
  const [avatarData, setAvatarData] = React.useState(null);
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState(null);
  const [group, setGroup] = React.useState(null);
  const [valid, setValid] = React.useState(false);
  const [buttonText, setButtonText] = React.useState(initialButtonText);

  React.useEffect(() => {
    if (role == 0 && avatar && name && group) {
      setValid(true);
      return;
    }
    if (role == 1 && avatar && name) {
      setValid(true);
      return;
    }
    setValid(false);
  }, [avatar, name, group, role]);

  const handleImage = (url, file) => {
    setAvatar(url);
    setAvatarData(file);
  };

  const handleFormSubmission = () => {
    setButtonText("Обработка...");

    const formData = new FormData();
    formData.append("avatar", avatarData);
    formData.append("name", name);
    formData.append("role", role);
    if (group) formData.append("group", group.id);

    axios
      .post("/users/update_user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => window.location.replace("/schedule"));
  };

  return (
    <div className="devise-form">
      <ImagePicker
        width="190px"
        height="190px"
        image={avatar}
        setImage={handleImage}
        style={{ margin: "0 auto" }}
      />
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Святослав Иванов"
      />
      <div className="selectors-wrapper">
        <PickRole role={role} setRole={setRole} setGroup={setGroup} />
        {role !== null && role !== 1 && (
          <GroupPicker currentGroup={group} setCurrentGroup={setGroup} />
        )}
      </div>
      {valid && (
        <DefaultButton
          buttonLabel={buttonText}
          onClick={handleFormSubmission}
        />
      )}
    </div>
  );
};

const PickRole = ({ role, setRole, setGroup }) => {
  return (
    <div className="role-picker">
      {(role == 0 || role == null) && (
        <div
          className={role == 0 ? "role active" : "role"}
          onClick={() => {
            if (role == null) setRole(0);
            else setRole(null);
          }}
        >
          Студент
        </div>
      )}
      {(role == 1 || role == null) && (
        <div
          className={role == 1 ? "role active" : "role"}
          onClick={() => {
            if (role == null) {
              setRole(1);
              setGroup(null);
            } else setRole(null);
          }}
        >
          Преподаватель
        </div>
      )}
    </div>
  );
};
