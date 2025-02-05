import React, { useContext, useState } from 'react'
import { MyContext } from '../shared/hooks/MyContextProvider';

export default function BurgerBody({ burgerState }) {
	const { messages, setMessages } = useContext(MyContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Function to clear messages and database
	const clearMessages = async () => {
		setLoading(true);
		setError(null);

		try {
			// Make the DELETE request to your backend
			const response = await fetch('https://messanger-backend-production.up.railway.app/clearMessages', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Failed to clear messages');
			}

			// If successful, handle success (e.g., show a success message, reload the messages, etc.)
			console.log('Messages cleared successfully');
		} catch (err) {
			// Handle error
			setError(err.message);
			console.error('Error clearing messages:', err);
		} finally {
			setLoading(false);
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
