import React, { useContext, useState } from 'react'
import { MyContext } from '../shared/hooks/MyContextProvider';

export default function BurgerBody({ burgerState }) {
	const { messages, setMessages } = useContext(MyContext);

	const clearMessages = async () => {
		try {
			const response = await fetch('https://messanger-backend-production.up.railway.app/clearMessages', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const error = await response.json();
				console.error('Error clearing messages:', error);
			} else {
				console.log('Messages cleared successfully');
			}
		} catch (err) {
			console.error('Error making request:', err);
		}
	};


	return (
		<div className={`burger-body${burgerState ? ' _active' : ''}`}>
			<h2 className='burger-body__title'>Options</h2>
			<div className="burger-body__row">
				<p className='burger-body__text'>Clear All Messeges:</p><button onClick={clearMessages} className='button button-clear'>Clear All</button>
			</div>
		</div>
	)
}
