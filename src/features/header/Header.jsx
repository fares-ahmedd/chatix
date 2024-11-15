import styled from "styled-components";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { checkValidImage } from "../../utils/helpers";
import { BsPeopleFill } from "react-icons/bs";
import { useAuth } from "../../context/AppDataContext";
import { useDarkMode } from "../../context/DarkModeContext";
import LazyLoadingLogo from "../../ui/LazyLoadingLogo";

const StyledHeader = styled.header`
  padding: 15px 5px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--global-background);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const StyledIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const Icon = styled.button`
  cursor: pointer;
  font-size: 20px;
  transition: 0.3s;
  padding: 5px;
  border-radius: 10px;

  &:hover {
    background-color: var(--color-brand-300);
    color: var(--color-brand-50);
  }
`;
const ToggleIcon = styled.button`
  cursor: pointer;
  font-size: 28px;
  transition: 0.3s;
  padding: 5px;
  border-radius: 10px;
  animation: 1s ease-in-out forwards;
  &:hover,
  &.active {
    background-color: var(--color-brand-300);
    color: var(--color-brand-50);
  }
`;
const PersonName = styled.h5`
  font-size: clamp(14px, 2.5vw, 22px);
  text-shadow: 1px 1px 3px #9e9e9e;
  text-transform: capitalize;
`;

function Header({ selectedUser }) {
  const { dispatch, isOpen } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  function handleLogout() {
    signOut(auth);
    dispatch({ type: "isOpen/logout" });
  }
  function handleToggleIsOpen() {
    dispatch({ type: "isOpen/toggle" });
  }
  return (
    <StyledHeader>
      <ToggleIcon
        onClick={handleToggleIsOpen}
        className={isOpen ? "active" : ""}
        aria-label={isOpen ? "close button" : "open button"}
        title={isOpen ? "close" : "open"}
      >
        <BsPeopleFill />
      </ToggleIcon>
      {selectedUser && (
        <User>
          <p className="talk">talking to:</p>
          <LazyLoadingLogo
            isSrc={checkValidImage(selectedUser.photoURL)}
            dimensions="50px"
          />

          <PersonName>{selectedUser.name}</PersonName>
        </User>
      )}
      <StyledIcons>
        <Icon
          onClick={toggleDarkMode}
          aria-label="toggle theme"
          title="toggle theme"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </Icon>
        <Icon onClick={handleLogout} aria-label="logout" title="logout">
          <IoIosLogOut />
        </Icon>
      </StyledIcons>
    </StyledHeader>
  );
}

export default Header;
