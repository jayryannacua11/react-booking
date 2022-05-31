import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import UserContext from '../UserContext';

export default function Logout(){

	//To delete the items inside localStorage
	//localStorage.clear();

	//Clear the localStorage of the user's information
	const { unsetUser, setUser } = useContext(UserContext);
	unsetUser();

	//Set the user state back to its original value
	useEffect( () => {
		setUser({
			accessToken: null
		})
	}, [])

	return(
		<Navigate to="/" />
		)
}