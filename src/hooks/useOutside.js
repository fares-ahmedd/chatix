import { useEffect, useRef } from "react";

export function useOutSide(handleClose, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handleClose();
        }
      }
      function handleInput(e) {
        if (e.key === "Escape") {
          handleClose();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);
      document.addEventListener("keydown", handleInput);
      return () => {
        document.removeEventListener("click", handleClick, listenCapturing);
        document.addEventListener("keydown", handleInput);
      };
    },
    [handleClose, listenCapturing]
  );
  return ref;
}
