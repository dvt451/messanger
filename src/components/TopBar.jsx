import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';

export default function TopBar({ isAnonymous, manName, girlName, updateName, userId }) {
	const [burgerState, setBurgerState] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [newName, setNewName] = useState(isAnonymous ? girlName : manName);

	const burgerHandler = () => {
		setBurgerState(!burgerState);
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleNameChange = (e) => {
		setNewName(e.target.value);
	};

	const handleSaveName = async () => {
		setIsEditing(false);
		updateName(newName); // Update the local state (in parent)

		// Send PUT request to update name in the database
		try {
			const response = await fetch('http://messanger-backend-production.up.railway.app/updateName', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: userId,  // Pass userId (this should be stored somewhere, could be in your app state)
					newName: newName,
				}),
			});

			const data = await response.json();
			if (response.ok) {
				console.log('Name updated successfully');
			} else {
				console.error('Failed to update name:', data);
			}
		} catch (error) {
			console.error('Error updating name:', error);
		}
	};

	return (
		<div className='top'>
			<div className="top__column">
				<div className="top__avatar -ibg">
					<img src={isAnonymous ? '/girl.jpg' : '/man.jpg'} alt="avatar" />
				</div>
				<div className='top__info'>
					<div className="top__name">
						{isEditing ? (
							<input
								type="text"
								value={newName}
								onChange={handleNameChange}
								onBlur={handleSaveName} // Automatically save on blur
							/>
						) : (
							<span>{newName}</span>
						)}
						<button className='top__edit-name' onClick={handleEditClick}>
							<CiEdit />
						</button>
					</div>
					<div className="top__status">Status: <span>waiting your answer</span></div>
				</div>
			</div>
			<div className="top__column">
				<button onClick={burgerHandler} className={`burger-button${burgerState ? ' _active' : ''}`}>
					<span></span>
				</button>
			</div>
		</div>
	);
}
