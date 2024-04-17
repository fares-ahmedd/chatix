import styled from "styled-components";
import Avatar from "../assets/my-img.png";
import Logo from "../assets/logo.svg";

import Input from "../ui/Input";
import { useAuth } from "../context/AuthContext";
import { checkValidImage } from "../utils/helpers";
const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
  border-right: 1px solid var(--border-color);
  background-color: var(--global-background);
  padding: 10px;
  text-align: center;
  overflow: auto;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  display: block;
  margin: auto;
  border-radius: 50%;
`;
const Hr = styled.hr`
  border-color: var(--border-color);
`;
const H5 = styled.h5`
  color: var(--text-color-900);
  font-weight: 900;
  letter-spacing: 1.2px;
`;
const Li = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.6s;
  padding: 7px 2px;
  margin: 3px;
  border-bottom: 2px solid var(--border-color);
  border-radius: 10px 10px 0 0;
  &:hover {
    background-color: var(--color-brand-300);
    color: var(--color-brand-50);
  }
`;
function Sidebar() {
  const { currentUser } = useAuth();
  const { displayName, photoURL } = currentUser;
  console.log(photoURL);
  return (
    <StyledSidebar>
      <Img src={Logo} alt="Logo" />
      <h2>Welcome</h2>
      <Img src={checkValidImage(photoURL)} alt="Avatar" />
      <H5>{displayName}</H5>
      <Hr />
      <Input label={"Search User"} id={"password"} fullWith={true} />

      <ul>
        <Li>
          <Img src={Avatar} alt="Avatar" />
          <span> Fares Ahmed</span>
        </Li>
        <Li>
          <Img src={Avatar} alt="Avatar" />
          <span> Fares Ahmed</span>
        </Li>
        <Li>
          <Img src={Avatar} alt="Avatar" />
          <span> Fares Ahmed</span>
        </Li>
        <Li>
          <Img src={Avatar} alt="Avatar" />
          <span> Fares Ahmed</span>
        </Li>
        <Li>
          <Img src={Avatar} alt="Avatar" />
          <span> Fares Ahmed</span>
        </Li>
        <Li>
          <Img src={Avatar} alt="Avatar" />
          <span> Fares Ahmed</span>
        </Li>
      </ul>
    </StyledSidebar>
  );
}

export default Sidebar;
