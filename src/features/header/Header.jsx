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
const StyledIcons = styled.ul`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const Icon = styled.li`
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
const ToggleIcon = styled.span`
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
      >
        <BsPeopleFill />
      </ToggleIcon>
      {selectedUser && (
        <User>
          <p>talking to:</p>
          <LazyLoadingLogo
            isSrc={checkValidImage(selectedUser.photoURL)}
            dimensions="50px"
          />

          <h5>{selectedUser.name}</h5>
        </User>
      )}
      <StyledIcons>
        <Icon onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </Icon>
        <Icon onClick={handleLogout}>
          <IoIosLogOut />
        </Icon>
      </StyledIcons>
    </StyledHeader>
  );
}

export default Header;
