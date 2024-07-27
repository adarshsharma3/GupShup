import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../Hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<form onSubmit={handleSubmit} className="relative flex items-center px-4 my-3">
			<div className="flex w-full items-center">
				<input
					type="text"
					className="border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 text-black"
					placeholder="Send a message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button
					type="submit"
					className="ml-2 text-white bg-red-600 hover:bg-black-700 focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
					disabled={loading}
				>
					{loading ? <div className="loading spinner"></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
