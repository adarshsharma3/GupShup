import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex h-[600px] w-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
		<Sidebar className='flex-shrink-0 w-1/4' /> {/* Adjust the width as needed */}
		<MessageContainer className='flex-grow' />
	</div>
	);
};
export default Home;