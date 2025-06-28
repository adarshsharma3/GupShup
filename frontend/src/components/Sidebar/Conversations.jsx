import Conversation from "./Conversation";
import useConversation from '../../Zustand/useConversation';
import useGetConversations from "../../Hooks/useGetConversations";
import { FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Conversations = () => {
	const {selectedConversation,setSelectedConversation}=useConversation();
	const { loading, conversations } = useGetConversations();
	const navigate = useNavigate();

	const handleCall = (userId) => {
		sessionStorage.setItem("outgoing-call", "true");
		sessionStorage.setItem("callee-name", Conversation.fullName);
		navigate(`/call/${userId}`);
	};

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<div
					key={conversation._id}
					className='flex items-center justify-between hover:bg-red-600  rounded-lg'
					onClick={()=>{
						setSelectedConversation(conversation);
					}}
				>
					<Conversation
						conversation={conversation}
						lastIndex={idx === conversations.length - 1}
					/>

					{/* Call Button */}
					<button
						onClick={() => handleCall(conversation._id)}
						className='p-2 text-white hover:text-green-800'
						title='Call this user'
					>
						<FaPhone />
					</button>
				</div>
			))}

			{loading && <span className='loading loading-spinner mx-auto'></span>}
		</div>
	);
};

export default Conversations;
