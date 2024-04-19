import styled from "styled-components";
import Logo from "../../assets/logo.svg";
import Input from "../../ui/Input";
import { useAuth } from "../../context/AuthContext";
import { checkValidImage } from "../../utils/helpers";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import User from "./User";

const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
  border-right: 1px solid var(--border-color);
  background-color: var(--global-background);
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

const Info = styled.section`
  background-color: var(--global-background-500);
  padding: 5px 0;
`;

const NoResultsMessage = styled.p`
  font-size: 14px;
  color: var(--text-color-500);
  text-align: center;
  margin-top: 20px;
`;

const Container = styled.section`
  padding: 0 5px;
`;

function Sidebar({ setSelectedUser }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [usersList, setUsersList] = useState([]);
  const { currentUser } = useAuth();
  const { displayName, photoURL, uid } = currentUser;
  const filteredUsers = usersList.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    const userRef = collection(db, "users");

    const usersQuery = query(
      userRef,
      where("name", ">=", searchQuery),
      where("name", "<", searchQuery + "\uf8ff")
    );
    const unsub = onSnapshot(usersQuery, (data) => {
      const users = [];
      data.forEach((userData) => {
        if (userData.data().uid !== uid) {
          users.push(userData.data());
        }
      });
      setUsersList(users);
    });
    return () => {
      unsub();
    };
  }, [searchQuery, uid]);
  async function handleSelect(user) {
    setSelectedUser(user);
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chats", combinedId));
      if (!response.exists()) {
        // todo: create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // todo: create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [`${combinedId}.userInfo`]: {
            uid: user.uid,
            name: user.name,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            name: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  console.log(usersList);
  return (
    <StyledSidebar>
      <Info>
        <Img src={Logo} alt="Logo" />
        <h2>Welcome</h2>
        <Img src={checkValidImage(photoURL)} alt="Avatar" />
        <H5>{displayName}</H5>
      </Info>
      <Hr />
      <Container>
        <Input
          label={"Search User"}
          id={"password"}
          fullWith={true}
          onChange={handleChange}
          value={searchQuery}
        />
        <ul>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <User user={user} onClick={() => handleSelect(user)} />
            ))
          ) : (
            <NoResultsMessage>
              No users match the search query.
            </NoResultsMessage>
          )}
        </ul>
      </Container>
    </StyledSidebar>
  );
}

export default Sidebar;
