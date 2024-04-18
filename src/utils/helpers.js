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
