🎙️ GupShup - Real-Time Chat & Voice Call Web App

GupShup is a modern full-stack web application that allows users to chat and initiate real-time voice calls over the internet — built using React, Zustand, WebRTC, and Socket.IO.
🚀 Features

    💬 Real-Time Text Chat between users

    📞 Voice Calling using peer-to-peer WebRTC

    🔔 Incoming Call Alerts with accept/reject functionality

    🟢 Online/Offline Status indicators

    🔍 Search Contacts by name

    📱 Responsive UI built with TailwindCSS

    ⚡ State Management via Zustand

    🧠 Smart Session Handling using sessionStorage

🛠️ Tech Stack
Frontend	Real-Time & Media	State Management & Backend
React	Socket.IO (WebSockets)	Zustand (global state)
Tailwind CSS	WebRTC + Simple-Peer (calls)	Express (Node.js backend API)
React Router DOM		Appwrite (auth, DB, file storage)
React Router		
## 🖼️ Screenshots

### 💬 Home Page
![Chat UI](./assets/Chat.jpeg)

### 🔔 Call Notification Modal
![Notification](./assets/Notification.jpeg)

### 📞 Calling Page
![Calling Page](./assets/Calling.jpeg)

---
	
	
🔧 Getting Started
1. Clone the Repo

git clone https://github.com/your-username/gupshup.git
cd gupshup

2. Install Dependencies

npm install

3. Environment Setup
In the backend Directory :
PORT=""  
MONGO_DB_URI=""
SECRET=""
...

4. Start the App

npm run dev (Frontend directory)
npm run dev (Backend directory )

🧪 How It Works

    On login, the user is connected to the Socket.IO server.

    Real-time chat is updated live via WebSockets.

    Voice calls are initiated using simple-peer, exchanging WebRTC offers/answers through Socket.IO.

    Audio is transmitted peer-to-peer between the caller and receiver.



Built with ❤️ by Adarsh Sharma
📃 License

MIT License. Feel free to use, fork, and improve GupShup! 🤝