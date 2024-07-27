import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import { useState } from "react";
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/react';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
const override= css`
display:block;
margin:0 auto;
`;
import useSignUp from "../../Hooks/useSignUp";
const SignUp = () => {
	const {loading ,signup}=useSignUp();
	const [inputs,setInputs]=useState({
		fullName:"",
		username:"",
		password:"",
		confirmPassword:"",
		gender:"",
	})
	const handleCheckBoxChange=(gender)=>{
		setInputs({...inputs,gender:gender})
	}
	const handleSubmit=async(e)=>{
		e.preventDefault();
		await signup(inputs);
	};
	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-red-500'> Demon/Talks</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input type='text' placeholder='Your Name' className='w-full input input-bordered  h-10' 
						value={inputs.fullName}
						onChange={(e)=> setInputs({...inputs ,fullName:e.target.value})}
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input type='text' placeholder='UserName' className='w-full input input-bordered h-10'
						value={inputs.username}
						onChange={(e)=>setInputs({...inputs,username:e.target.value})}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
						onChange={(e)=>setInputs({...inputs,password:e.target.value})}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
						onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
						/>
					</div>

					<GenderCheckbox onCheckBoxChange={handleCheckBoxChange} selectedGender={inputs.gender}/>   
					{/* gendercheckbox change k ander koi prop bhejoge to vo hoga gender jo ki humne bheja hai gender check boc.jsx k ander  */}

					<Link to="/Login" className='text-sm hover:underline hover:text-red-600 mt-2 inline-block' href='#'>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>{loading ?<RingLoader color={'white'} css ={override} size={30} /> :"Sign Up"}</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;