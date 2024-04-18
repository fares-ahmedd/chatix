import styled from "styled-components";
import Avatar from "../assets/my-img.png";
import Logo from "../assets/logo.svg";
import Input from "../ui/Input";
import { useAuth } from "../context/AuthContext";
import { checkValidImage } from "../utils/helpers";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../services/firebase";

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
  font-size: 12px;
  font-weight: bold;
  text-overflow: clip;
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

const Info = styled.section`
  background-color: var(--global-background-500);
  border-radius: 10px;
  padding: 5px 0;
`;

const NoResultsMessage = styled.p`
  font-size: 14px;
  color: var(--text-color-500);
  text-align: center;
  margin-top: 20px;
`;

const DUMMY_DATA = [
  { name: "eslam ahmed" },
  { name: "mohamed ahmed" },
  { name: "Eslam ahmed" },
  { name: "Fares ahmed" },
  { name: "fares ahmed" },
];

function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [usersList, setUsersList] = useState([]);
  const { currentUser } = useAuth();
  const { displayName, photoURL, uid } = currentUser;
  const filteredUsers = DUMMY_DATA.filter((user) =>
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
  }, [searchQuery]);
  console.log(usersList);
  // async function handleSelect() {
  //   const combinedId = uid;
  //   const response = await getDocs(db, "chats");
  // }
  return (
    <StyledSidebar>
      <Info>
        <Img src={Logo} alt="Logo" />
        <h2>Welcome</h2>
        <Img src={checkValidImage(photoURL)} alt="Avatar" />
        <H5>{displayName}</H5>
      </Info>
      <Hr />
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
            <Li key={user.name}>
              <Img src={Avatar} alt="Avatar" />
              <span>{user.name}</span>
            </Li>
          ))
        ) : (
          <NoResultsMessage>No users match the search query.</NoResultsMessage>
        )}
      </ul>
    </StyledSidebar>
  );
}

export default Sidebar;
