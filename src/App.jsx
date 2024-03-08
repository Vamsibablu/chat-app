import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import ChatInterface from "./components/chatInterface";
import "./App.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <ChatInterface />
    </div>
  );
}

export default App;
