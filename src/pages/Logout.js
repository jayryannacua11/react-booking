import { Navigate } from 'react-router-dom'

export default function Logout(){

	//To delete the items inside localStorage
	localStorage.clear();

	return(
		<Navigate to="/" />
		)
}