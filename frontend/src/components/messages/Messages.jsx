import { useEffect ,useRef} from "react";
import useGetMessages from "../../Hooks/useGetMessages";
import MessageSkeletons from "../../Skeletons/MessageSkeletons";
import Message from "./Message";
import useListenMessages from "../../Hooks/useListenMessages";
const Messages = () => {
	const {messages,loading}=useGetMessages();
	useListenMessages();
	const lastMessageRef=useRef();  // use ref se aap use point krte hai ho parenthesis k ander hota hai 
	console.log("messages:",messages);
	useEffect(()=>{
      setTimeout(()=>{
          lastMessageRef.current?.scrollIntoView({behaviour:"smooth"});
  },100);
	},[messages])
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading && messages.length>0 && messages.map((message)=>
			<div key={message._id} ref={lastMessageRef}>     
			{/* idhr mai baar baar userRef k parenthesis k ander div ko daal raha hu matlab ki lastref .current hamesha latest message ko  */}
			{/* pointkrega aur uski madad se hum scroll effect daal denge */}
			<Message key={message._id} message={message}/>
			</div>
			)}
		{loading && [...Array(4)].map((_,idx) => <MessageSkeletons key={idx}/>)}

		{!loading && messages.length ===0 && (<p className="text-center">{`Send your first meesage!!!!`}</p>)}
		</div>
	);
};
export default Messages;