import React from 'react'
import { CiEdit } from "react-icons/ci";

export default function TopBar({ isAnonymous, manName, girlNAme }) {
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

			</div>
		</div>
	)
}
