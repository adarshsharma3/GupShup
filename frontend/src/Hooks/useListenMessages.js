import { useEffect } from "react";
import { useSocketContext } from "../Context/SocketContext";
import useConversation from "../Zustand/useConversation";

const useListenMessages=()=>{
    const {socket}=useSocketContext();
    const {messages,setMessages}=useConversation();

useEffect(()=>{
socket?.on("newMessage",(newMessage)=>{
    setMessages([...messages,newMessage]);
});
return ()=> socket?.off("newMessage");
// When the component that uses the useListenMessages hook is unmounted, the cleanup 
// function is called. This ensures that the event listener is removed and does not continue to consume resources or receive events.
},[socket,setMessages,messages]);

};
export default useListenMessages;

// import { useEffect } from "react";

// import { useSocketContext } from "../Context/SocketContext";
// import useConversation from "../Zustand/useConversation";

// // import notificationSound from "../assets/sounds/notification.mp3";

// const useListenMessages = () => {
// 	const { socket } = useSocketContext();
// 	const { messages, setMessages } = useConversation();

// 	useEffect(() => {
// 		socket?.on("newMessage", (newMessage) => {
// 			// newMessage.shouldShake = true;
// 			// const sound = new Audio(notificationSound);
// 			// sound.play();
// 			setMessages([...messages, newMessage]);
// 		});

// 		return () => socket?.off("newMessage");
// 	}, [socket, setMessages]);
// };
// export default useListenMessages;