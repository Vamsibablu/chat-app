import React, { useEffect, useState } from "react";
import { responses } from "../data/api";
import UsersList from "./userList";
import UserMessages from "./userMessages";
import Title from "antd/es/typography/Title";
const ChatInterface = () => {
  const [userList, setUsersList] = useState([]);
  const [response, setResponse] = useState(responses);
  const [currentUser, setCurrentUser] = useState({});
  const [messages, setMessages] = useState({});
  const getData = async () => {
    try {
      const data = await fetch("https://randomuser.me/api/?results=5&seed=b");
      const res = await data.json();
      const userList = res.results.map((user) => {
        const obj = {
          name: user.name.first,
          image: user.picture.thumbnail,
          id: crypto.randomUUID(),
        };
        return obj;
      });
      setUsersList(userList);
    } catch (err) {
      setUsersList([]);
    }
  };
  const handleDelete = (user) => {
    const newUserList = userList.filter((item) => item.id !== user.id);
    const tempMessages = { ...messages };
    if (tempMessages[user.id]) {
      delete tempMessages[user.id];
    }
    currentUser.id === user.id && setCurrentUser({});
    setUsersList(newUserList);
    setMessages(tempMessages);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container">
      <Title level={2} style={{ textAlign: "center" }}>
        CHAT APP
      </Title>
      <div style={{ display: "flex", height: "88%" }}>
        <div
          style={{
            width: "30%",
            marginRight: "10px",
          }}
        >
          <UsersList
            userList={userList}
            setUsersList={setUsersList}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            handleDelete={handleDelete}
          />
        </div>
        <div style={{ width: "70%" }}>
          <UserMessages
            response={response}
            currentUser={currentUser}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
