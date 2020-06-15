import React from "react";

export default ({
  width,
  height,
  image,
  setImage,
  style,
  imageStyle,
  id,
  className,
}) => {
  const containerStyle = style ? style : {};
  const imgStyle = imageStyle ? imageStyle : {};
  const [uri, setUri] = React.useState(image);
  const [file, setFile] = React.useState({});

  React.useEffect(() => {
    if (uri) setImage(uri, file);
  }, [uri]);

  return (
    <div
      style={{
        width: width,
        height: height,
        position: "relative",
        ...containerStyle,
      }}
    >
      {uri && (
        <img
          src={uri}
          style={{
            width: width,
            height: height,
            objectFit: "cover",
            objectPosition: "center center",
            ...imgStyle,
          }}
        />
      )}
      <div
        style={{
          width: width,
          height: height,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <input
          className={className ? className + " image_input" : "image_input"}
          type="file"
          id={id ? id : "image"}
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
              let reader = new FileReader();

              reader.onload = function (el) {
                setUri(el.target.result);
              };

              reader.readAsDataURL(e.target.files[0]);
            }
          }}
          style={{ display: "none" }}
        />
        {!uri && (
          <label
            htmlFor={id ? id : "image"}
            style={{
              fontFamily: "Steinbeck",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
              border: "2px solid #808080",
              backgroundColor: "rgba(0,0,0,0)",
              cursor: "pointer",
              fontSize: "20px",
              lineHeight: "20px",
            }}
          >
            <div
              style={{ color: "#808080", width: "70%", textAlign: "center" }}
            >
              Добавить аватар
            </div>
          </label>
        )}
        {uri && (
          <label
            htmlFor={id ? id : "image"}
            style={{
              fontFamily: "Steinbeck",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
              backgroundColor: "rgba(0,0,0,0)",
              cursor: "pointer",
              fontSize: "20px",
              lineHeight: "20px",
            }}
            className="show-on-hover"
          >
            <div
              style={{ color: "#808080", width: "70%", textAlign: "center" }}
            >
              Изменить аватар
            </div>
          </label>
        )}
      </div>
    </div>
  );
};
