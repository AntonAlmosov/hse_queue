import React from "react";
import axios from "axios";

import ImagePicker from "../util/ImagePicker";
import GroupPicker from "../util/GroupPicker";
import DefaultButton from "../buttons/DefaultButton";

export default ({
  initialButtonText,
  initialAvatar,
  initialName,
  initialRole,
  initialGroup,
}) => {
  const [avatar, setAvatar] = React.useState(initialAvatar || null);
  const [avatarData, setAvatarData] = React.useState(null);
  const [name, setName] = React.useState(initialName || "");
  const [role, setRole] = React.useState(
    initialRole !== undefined ? initialRole : null
  );
  const [group, setGroup] = React.useState(initialGroup || null);
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
    if (avatar !== initialAvatar) formData.append("avatar", avatarData);
    formData.append("name", name);
    formData.append("role", role);
    if (group) formData.append("group", group.id);

    axios
      .patch("/users/update_user", formData, {
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
        value={name}
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
