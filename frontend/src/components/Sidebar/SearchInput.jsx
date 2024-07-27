 import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import useConversation from "../../Zustand/useConversation";
import useGetCoversations from '../../Hooks/useGetConversations';
import toast from "react-hot-toast";
const SearchInput = () => {
	const[search,setSearch]=useState("");
	const {setSelectedConversation}=useConversation();
	const {conversations}=useGetCoversations();
	const HandleSubmit=(e)=>{
      e.preventDefault();
 if(!search) return toast.error('Enter something to find anyone');
	const person=conversations.find((c)=>
		c.fullName.toLowerCase().includes(search.toLowerCase()));
if(person)
setSelectedConversation(person);
else toast.error("No such member here");

	}
	return (
		<form className='flex items-center gap-2' onSubmit={HandleSubmit}>
			<input value={search} type='text' placeholder='Search…' className='input input-bordered bg-white rounded-full' onChange={(e)=>setSearch(e.target.value)}/>
			<button type='submit' className='btn btn-circle bg-red-700 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;