import { BiLogOut } from "react-icons/bi";
import useLogout from "../../Hooks/useLogout";
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/react';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
const override= css`
display:block;
margin:0 auto;
`;
const LogoutBtn = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
			) : (
				// <span className='loading loading-spinner'></span>
				<RingLoader color={'white'} css ={override} size={30} />
		
			)}
		</div>
	);
};
export default LogoutBtn;