import { Button, Avatar, Typography, Card, Input, Space } from "antd";
import { useState } from "react";
import React from "react";
const { Title } = Typography;
import "../App.css";
export default function UsersList({
  userList,
  setUsersList,
  currentUser,
  setCurrentUser,
  handleDelete,
}) {
  const [newUser, setNewUser] = useState("");
  const handleAdd = () => {
    setUsersList([
      ...userList,
      {
        name: newUser,
        image: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
        id: crypto.randomUUID(),
      },
    ]);
    setNewUser("");
  };
  return (
    <Card className="userlist-container">
      <div style={{ overflowY: "auto", height: "85%", marginBottom: "20px" }}>
        {userList.map((user, index) => (
          <div
            key={index}
            className="user-list"
            style={{
              background: user.id === currentUser.id ? "#72a0c1" : "white",
            }}
            onClick={(e) => {
              e.target.className !== "delete" && setCurrentUser(user);
            }}
          >
            <Title
              level={5}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div>
                <Avatar src={user.image} /> &nbsp;&nbsp;
                <span
                  style={{
                    color: user.id === currentUser.id ? "white" : "black",
                  }}
                >
                  {user.name}
                </span>
              </div>
              <button
                className="delete"
                onClick={() => {
                  handleDelete(user);
                }}
              >
                Delete
              </button>
            </Title>
          </div>
        ))}
      </div>
      <div style={{ height: "15%", width: "100%" }}>
        <Space direction="horizontal">
          <Input
            placeholder="Add User"
            value={newUser}
            onChange={(e) => {
              setNewUser(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                handleAdd();
              }
            }}
          />
          <Button onClick={handleAdd} disabled={!newUser} type="primary">
            Add
          </Button>
        </Space>
      </div>
    </Card>
  );
}
