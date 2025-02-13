import { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import { MyContext } from "../shared/hooks/MyContextProvider";

export default function Chat() {
	const location = useLocation();
	const isAnonymous = location.pathname.includes("/dd"); // Check if it's your side

	const { messages, setMessages } = useContext(MyContext);

	const [manName, setManName] = useState("Anonymus");
	const [girlName, setGirlName] = useState("Ani");

	const updateName = (newName) => {
		if (isAnonymous) {
			setGirlName(newName);
		} else {
			setManName(newName);
		}
	}

	const [input, setInput] = useState("");
	const [typing, setTyping] = useState(false); // State to track typing status
	const chatEndRef = useRef(null);
	const ws = useRef(null); // WebSocket reference

	// Helper function to get formatted timestamp
	const getTimestamp = () => {
		const now = new Date();
		return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Format time as HH:MM AM/PM
	};

	// Connect to WebSocket server
	useEffect(() => {
		ws.current = new WebSocket("wss://messanger-backend-production.up.railway.app");
		// ws.current = new WebSocket("ws://localhost:8080");

		ws.current.onopen = () => {
			setTyping(false); // Reset typing status when connected
		};

		ws.current.onmessage = async (event) => {
			try {
				const data = event.data instanceof Blob ? await event.data.text() : event.data;
				const receivedMessage = JSON.parse(data);

				if (receivedMessage.text === "typing") {
					if (receivedMessage.sender !== (isAnonymous ? "sender" : "replyer")) {
						setTyping(true);
						setTimeout(() => setTyping(false), 3000);
					}
				} else {
					setMessages((prev) => [...prev, { ...receivedMessage, timestamp: getTimestamp() }]);
				}
			} catch (error) {
				console.error("Error parsing WebSocket message:", error);
			}
		};

		return () => ws.current.close();
	}, [isAnonymous]);



	const sendMessage = () => {
		if (!input.trim()) return;

		// Ensure WebSocket is open before sending the message
		if (ws.current.readyState === WebSocket.OPEN) {
			const messageData = {
				text: input,
				sender: isAnonymous ? "sender" : "replyer",
				timestamp: getTimestamp(), // Add timestamp
			};

			ws.current.send(JSON.stringify(messageData)); // Send message via WebSocket
			setInput("");
		} else {
			console.error("WebSocket is not open. Ready state:", ws.current.readyState);
		}
	};

	// Handle typing indicator broadcast
	const handleTyping = () => {
		if (input.trim()) {
			// Ensure WebSocket is open before sending the typing message
			if (ws.current.readyState === WebSocket.OPEN) {
				ws.current.send(JSON.stringify({ text: "typing", sender: isAnonymous ? "sender" : "replyer" }));
			} else {
				console.error("WebSocket is not open. Ready state:", ws.current.readyState);
			}
		}
	};

	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className={`chat-window${isAnonymous ? " anonymus" : ""}`}>
			<TopBar isAnonymous={isAnonymous} manName={manName} girlName={girlName} updateName={updateName} />
			<div className="chat-window__messages">
				<div className="chat-window__messages-wrapper">
					{messages.map((msg, index) => (
						<div key={index} className={`message ${msg.sender}`}>
							<p className="message__text">{msg.text}</p>
							<span className="message__timestamp">{msg.timestamp}</span> {/* Display timestamp */}
						</div>
					))}
					{typing && <div className="typing-indicator">{isAnonymous ? girlName : manName} is typing...</div>}
					<div ref={chatEndRef}></div>
				</div>
			</div>
			<div className="input-container">
				<input
					type="text"
					placeholder="Type a message..."
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
						handleTyping(); // Trigger typing indicator
					}}
					onKeyDown={(e) => e.key === "Enter" && sendMessage()}
				/>
				<button className="input-container__send-button" onClick={sendMessage}>Send</button>
			</div>
		</div>
	);
}
