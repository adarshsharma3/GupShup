import { useAuthContext } from "../../Context/AuthContext";
import { extractTime } from "../../utils/extractTime.js";
import useConversation from "../../Zustand/useConversation";

const Message = ({ message }) => {
   
    const {authUser}=useAuthContext();
    const formatTime=extractTime(message.createdAt);
    const {selectedConversation}=useConversation();
    const fromMe=message.senderId===authUser._id;
    const chatClass=fromMe ? `chat-end` : `chat-start`;
    const profilePic=fromMe? authUser.profilePhoto:selectedConversation?.profilePhoto;
    const bubbleBgColor=fromMe ? 'bg-red-700':'bg-black-400'
    return (
		<div className={`chat ${chatClass}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor}  pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'> {formatTime} </div>
		</div>
	);
};
export default Message;