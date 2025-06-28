import { useEffect } from "react";
import useConversation from "../../Zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import {useAuthContext} from '../../Context/AuthContext'

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		return () => setSelectedConversation(null); // Jab hum us conversation se hat jaenge tab koi aur conversation aaegi idhr
	}, [setSelectedConversation]);

	return (
		<div className='flex flex-col flex-grow w-full'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-transparent px-4 py-2 mb-2'>
						<span className='label-text text-xl'>To:</span>{" "}
						<span className='text-white text-3xl font-bold'>{selectedConversation.fullName}</span>
					</div>
					<Messages className='w-full'/>
					<MessageInput className='w-full'/>
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();             //context api waala
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Hi {authUser.fullName} Bro .Forget WhatsApp use This!!</p>
				<p>Still Waiting!! Go and Chat!</p>
				{/* <TiMessages className='text-3xl md:text-6xl text-center' /> */}
			</div>
		</div>
	);
};

