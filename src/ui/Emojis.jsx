import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { MdEmojiEmotions } from "react-icons/md";
import { useOutSide } from "../hooks/useOutside";
import { createPortal } from "react-dom";
import { HiMiniBackspace } from "react-icons/hi2";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const StyledToggle = styled.button`
  font-size: 25px;

  display: flex;
  transition: 0.3s;
  border-radius: 10px;
`;
const StyledList = styled.ul`
  position: fixed;
  padding-top: 20px !important;
  z-index: 99999;
  background-color: var(--global-background-500);
  width: 40%;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  max-height: 150px;
  overflow-y: auto;
`;
const CloseBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  text-align: end;
  position: absolute;
  right: 10px;
  top: 5px;
  transition: all 0.5s;
  &:hover {
    color: #ff6f6f;
  }
`;
const EmojisContext = createContext();

function Emojis({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <EmojisContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      <>{children}</>
    </EmojisContext.Provider>
  );
}
function Toggle({ id, ...props }) {
  const { openId, close, open, setPosition } = useContext(EmojisContext);
  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    openId === "" || openId !== id ? open(id) : close();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y - rect.height - 141,
    });
  }
  return (
    <StyledToggle onClick={handleClick} role="button" {...props}>
      {!openId ? <MdOutlineEmojiEmotions /> : <MdEmojiEmotions />}
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { openId, position, close } = useContext(EmojisContext);
  const ref = useOutSide(close, false);
  if (openId !== id) return null;
  return createPortal(
    <StyledList style={{ right: position?.x, top: position?.y }} ref={ref}>
      <li>
        <CloseBtn onClick={close}>
          <HiMiniBackspace />
        </CloseBtn>
      </li>
      <li>{children}</li>
    </StyledList>,
    document.body
  );
}

Emojis.Toggle = Toggle;
Emojis.List = List;
export default Emojis;
