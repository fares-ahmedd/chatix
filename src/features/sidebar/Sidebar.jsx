import styled from "styled-components";
import Input from "../../ui/Input";
import { useAuth } from "../../context/AppDataContext";
import { checkValidImage } from "../../utils/helpers";
import { useState } from "react";
import User from "./User";
import LazyLoadingLogo from "../../ui/LazyLoadingLogo";
import useUsersList from "./useUsersList";
import createChat from "../../services/createChat";

const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
  border-right: 1px solid var(--border-color);
  background-color: var(--global-background);
  text-align: center;
  overflow: auto;

  @media (max-width: 500px) {
    min-width: 300px;
  }
`;

const Span = styled.span`
  color: var(--text-color-900);
  font-weight: 900;
  letter-spacing: 1.2px;
`;

const Info = styled.section`
  background-color: var(--global-background-500);
  padding: 5px 0;
`;

const NoResultsMessage = styled.span`
  font-size: 14px;
  color: var(--text-color-500);
  text-align: center;
  margin-top: 20px;
`;

const Container = styled.section`
  padding: 0 5px;
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
`;

function Sidebar({ setSelectedUser }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeUser, setActiveUser] = useState(
    localStorage.getItem("activeUser")?.split('"').join("")
  );

  const { currentUser, isOpen, dispatch, idRef, selectedUser } = useAuth();
  const { displayName, photoURL, uid } = currentUser;
  const usersList = useUsersList({ uid, idRef, setLoading });

  const filteredUsers = usersList.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  async function handleSelect(user) {
    setSelectedUser(user);
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    idRef.current = combinedId;
    selectedUser.current = user;
    try {
      await createChat({ combinedId, currentUser, user });
      dispatch({ type: "isSelected" });
      localStorage.setItem("last-talk", JSON.stringify(user));
      localStorage.setItem("combinedId", JSON.stringify(combinedId));
      localStorage.setItem("activeUser", JSON.stringify(user.uid));
      setActiveUser(user.uid);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    isOpen && (
      <StyledSidebar>
        <Info>
          <LazyLoadingLogo dimensions="100px" />
          <h2>Welcome</h2>
          <LazyLoadingLogo
            isSrc={checkValidImage(photoURL)}
            dimensions="50px"
          />
          <Span>{displayName}</Span>
        </Info>

        <Container>
          <Input
            label={"Search User"}
            id={"password"}
            fullWidth={true}
            onChange={handleChange}
            value={searchQuery}
            type={"search"}
          />
          {filteredUsers.length > 0 ? (
            <Ul>
              {filteredUsers.map((user) => (
                <User
                  user={user}
                  key={user.uid}
                  onClick={() => handleSelect(user)}
                  className={user.uid === activeUser ? "active" : ""}
                />
              ))}
            </Ul>
          ) : loading ? (
            <span>Loading Users...</span>
          ) : (
            <NoResultsMessage>No users Found !</NoResultsMessage>
          )}
        </Container>
      </StyledSidebar>
    )
  );
}

export default Sidebar;
