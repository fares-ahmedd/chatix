export function isInvalidInput(error) {
  return error === undefined || error === true ? "invalid" : "";
}
