import { useEffect, useState } from "react";
import { useSocketContext } from "../../Context/SocketContext";
import { useNavigate } from "react-router-dom";
import IncomingCallModal from "../../components/Calls/IncomingCallModal";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = () => {
	const { socket } = useSocketContext();
	const navigate = useNavigate();

	const [incoming, setIncoming] = useState(null);
	// incoming = { callerId, callerName, offer }

	// Listen for incoming call socket event
	useEffect(() => {
		if (!socket) return;

		socket.on("call:incoming", ({ callerId, offer, callerName }) => {
			setIncoming({ callerId, callerName, offer });
		});

		return () => socket.off("call:incoming");
	}, [socket]);

	const acceptCall = () => {
		// Pass offer to call page
		sessionStorage.setItem("incoming-offer", JSON.stringify(incoming.offer));
		navigate(`/call/${incoming.callerId}`);
		setIncoming(null);
	};

	const rejectCall = () => {
		socket.emit("call:reject", { callerId: incoming.callerId });
		setIncoming(null);
	};

	return (
		<div className="relative w-screen h-screen flex items-center justify-center">
  <div className="flex h-[98%] w-[98%] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
    <Sidebar className="flex-shrink-0 w-1/4" />
    <MessageContainer className="flex-grow" />
  </div>

  {incoming && (
    <IncomingCallModal
      callerName={incoming.callerName || incoming.callerId}
      onAccept={acceptCall}
      onReject={rejectCall}
    />
  )}
</div>
	);
};

export default Home;
