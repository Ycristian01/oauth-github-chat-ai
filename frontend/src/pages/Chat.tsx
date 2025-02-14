import { useEffect, useState } from "react";
import axios from "axios";

interface Message {
  role: "user" | "AI";
  content: string;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedAvatar = localStorage.getItem("avatar");

    if (storedUsername) setUsername(storedUsername);
    if (storedAvatar) setAvatar(storedAvatar);
  }, []);

  const sendMessage = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Not authenticated");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/chat/",
        { message },
        { headers: { Authorization: `Token ${token}` } }
      );

      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: message },
        { role: "AI", content: response.data },
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="p-4">
      {avatar && (
        <img
          src={avatar}
          alt="User Avatar"
          className="w-6 h-6 rounded-full mr-2"
        />
      )}
      <h1 className="text-xl font-bold">Chat with AI</h1>
      <div className="border p-4 h-64 overflow-y-auto">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`p-2 my-2 rounded ${msg.role === "user" ? "bg-blue-200" : "bg-gray-200"}`}>
            <strong>{msg.role === "user" ? username || "User" : "AI"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full mt-2"
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} className="mt-2 p-2 bg-green-500 text-white rounded">
        Send
      </button>

    </div>
  );
};

export default Chat;