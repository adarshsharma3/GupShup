// import useConversation from '../../Zustand/useConversation';
import { useSocketContext } from '../../Context/SocketContext';
const Conversation = ({conversation,lastIndex}) => {
// const {selectedConversation,setSelectedConversation}=useConversation();
	// const selected=selectedConversation?._id===conversation._id;

	const{onlineUsers}=useSocketContext();
	const isActive=onlineUsers.includes(conversation._id);
	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-red-500 rounded p-2 py-1 cursor-pointer  `}
			// onClick={()=>{
			// 	setSelectedConversation(conversation);
			// }}
			>
				<div className={`avatar ${isActive ?"online": ""}`}>
					<div className='w-12 rounded-full'>
						<img
							src={conversation.profilePhoto}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						
					</div>
				</div>
			</div>
         
		{!lastIndex &&	<div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;