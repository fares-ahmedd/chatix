import UnknownUser from "../assets/unknownUser.jpg";

export function isInvalidInput(error) {
  return error === undefined || error === true ? "invalid" : "";
}

export function checkValidImage(image) {
  return image === null ? UnknownUser : image;
}

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function getTime(seconds, nanoseconds) {
  const date = new Date(seconds * 1000 + nanoseconds / 1000000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const s = date.getSeconds();
  const timeString = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;

  return timeString;
}

export function formatTime(time) {
  const [hours, minutes, seconds] = time.split(":").map(Number);

  const period = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours % 12 || 12;

  const formattedTime = `${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${period}`;

  return formattedTime;
}
