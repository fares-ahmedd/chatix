import styled from "styled-components";
import unknownUser from "../../assets/unknownUser.jpg";

const Span = styled.span`
  flex: 1;
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  display: block;
  margin: auto;
  border-radius: 50%;
`;

const Li = styled.li`
  display: flex;
  font-weight: bold;
  text-overflow: clip;
  align-items: center;
  cursor: pointer;
  transition: 0.6s;
  padding: 7px 2px;
  margin: 3px;
  border-bottom: 2px solid var(--border-color);
  border-radius: 10px 10px 0 0;

  &:hover,
  &.active {
    background-color: var(--color-brand-300);
    color: var(--color-brand-50);
  }
`;
function User({ user, onClick, className }) {
  return (
    <Li
      key={user.uid}
      title={user.name}
      onClick={onClick}
      className={className}
    >
      <Img src={user.photoURL || unknownUser} alt="Avatar" />
      <Span>{user.name}</Span>
    </Li>
  );
}

export default User;
