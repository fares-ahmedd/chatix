import styled from "styled-components";
import Avatar from "../assets/my-img.png";
import { FaMoon, FaUser, FaArrowRight } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const StyledHeader = styled.header`
  padding: 15px 5px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--global-background);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Img = styled.img`
  width: 50px;
  display: block;
  border-radius: 50%;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const StyledIcons = styled.ul`
  display: flex;
  align-items: center;
  gap: 6px;
`;
function Header() {
  return (
    <StyledHeader>
      <User>
        <Img src={Avatar} alt={"Avatar"} />
        <h5>Fares Ahmed</h5>
      </User>
      <StyledIcons>
        <li>
          <FaMoon />
        </li>
        <li>
          <FaUser />
        </li>
        <li>
          <FaArrowRight />
        </li>
      </StyledIcons>
    </StyledHeader>
  );
}

export default Header;
