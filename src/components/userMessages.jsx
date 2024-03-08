import React, { useEffect, useRef, useState } from "react";
import { Card, Input, Space, Button } from "antd";
import Typography from "antd/es/typography/Typography";
const { Title } = Typography;

export default function UserMessages({
  response,
  currentUser,
  messages,
  setMessages,
}) {
  const [userInput, setUserInput] = useState("");
  const isValidCurrentUser = Object.keys(currentUser).length > 0;
  const inputRef = useRef(null);
  const handleSendMessage = () => {
    const userMessage = userInput.trim().toLowerCase();
    const aiMessage =
      response[userMessage] || "I'm not sure how to respond to that.";
    const date = new Date();
    const currentTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const currentMessages = [
      ...(messages[currentUser.id] || []),
      {
        content: userInput,
        isUser: true,
        timeStamp: currentTime,
        userId: currentUser.id,
      },
      {
        content: aiMessage,
        isUser: false,
        timeStamp: currentTime,
        userId: currentUser.id,
      },
    ];
    setMessages({ ...messages, [currentUser.id]: currentMessages });
    setUserInput("");
  };
  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [currentUser]);
  return (
    <Card
      style={{
        height: "100%",
        background: "#F0F8FF",
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: isValidCurrentUser ? "flex-start" : "center",
        }}
      >
        {isValidCurrentUser ? (
          <>
            <div style={{ marginTop: "30px" }}>
              <Space.Compact
                style={{
                  width: "100%",
                }}
              >
                <Input
                  placeholder="Message"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value) {
                      handleSendMessage();
                    }
                  }}
                  ref={inputRef}
                />
                <Button
                  type="primary"
                  onClick={handleSendMessage}
                  disabled={!userInput}
                >
                  Send
                </Button>
              </Space.Compact>
            </div>
            <div>
              {messages[currentUser.id] &&
                messages[currentUser.id].map((message, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "8px",
                      color: message.isUser ? "green" : "blue",
                      textAlign: message.isUser ? "right" : "left",
                    }}
                  >
                    {message.content}&nbsp;-&nbsp; {message.timeStamp}
                  </div>
                ))}
            </div>
          </>
        ) : (
          <Title level={5}>
            Hey there! 👋 Ready to start a conversation? Click on a friend's
            name to chat with them. Your messages are just a click away!
          </Title>
        )}
      </div>
    </Card>
  );
}
