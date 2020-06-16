export const getTime = (time) => {
  const strTime = String(time);
  if (strTime.length === 3)
    return strTime.slice(0, 1) + ":" + strTime.slice(1, 3);
  else return strTime.slice(0, 2) + ":" + strTime.slice(2, 4);
};
