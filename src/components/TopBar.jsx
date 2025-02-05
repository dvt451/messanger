import React, { useState } from 'react'
import { CiEdit } from "react-icons/ci";
import BurgerBody from './BurgerBody';

export default function TopBar({ isAnonymous, manName, girlNAme }) {
	const [burgerState, setBurgerState] = useState(false)
	const burgerHandler = () => {
		setBurgerState(!burgerState)
	}
	return (
		<div className='top'>
			<div className="top__column">
				<div className="top__avatar -ibg">
					<img src={isAnonymous ? '/girl.jpg' : '/man.jpg'} alt="avatar" />
				</div>
				<div className='top__info'>
					<div className="top__name"><span>{isAnonymous ? girlNAme : manName}</span><button className='top__edit-name'><CiEdit /></button></div>
					<div className="top__status">Status: <span>waiting your answer</span></div>
				</div>
			</div>
			<div className="top__column">
				<button onClick={burgerHandler} className={`burger-button${burgerState ? ' _active' : ''}`}>
					<span></span>
				</button>
			</div>
			<BurgerBody burgerState={burgerState} />
		</div>
	)
}
