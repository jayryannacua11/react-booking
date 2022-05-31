import { Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';


import UserContext from '../UserContext';


export default function Login(){

	/*fetch()
			-Method from JS which allows to send a request to an API and process its response.

		Syntax: fetch('url', {optional object}).then().then()
		Syntax: fetch('url', {optional object})
		-url from the API (backend) Ex. http://localhost:4000/users/login or https://heroku.com/users/login
		-{optional object} objects which contains additional information about our requests such as method, the body or the headers: content-type, authorization

		//Getting a response is usually a two-stage process
		.then(response => response.json()) -> parse the response as JSON
		.then(actualData => console.log(actualData)) -> Process the result of the response

	*/

	const navigate = useNavigate();

	//Consume the User Context object and it's properties to use for user validation and to get the email coming from the login 
	//user & setUser is from UserContext variable
	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	//Button
	const [isActive, setIsActive] = useState('')

	useEffect( () => {
		if(email !== '' && password !== ''){
			setIsActive(true);
		}else setIsActive(false);
	}, [email, password])

	function authentication(event){
		event.preventDefault();

		//email: email
		//First email is from backend client then the 2nd is from the useState email getter (to get the value)
		fetch('http://localhost:4000/users/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password
			})

		})
		.then(response => response.json())
		.then(data => {
			console.log(data)

			if(data.accessToken !== undefined){
				localStorage.setItem('accessToken', data.accessToken);
				setUser({
					accessToken: data.accessToken
				})

				Swal.fire({ title: 'Sheesh', icon: 'success', text: 'Sucessfully Login!'})

				//Get user's details from our token
				//No need method because GET is already the default of method: ..
				fetch('http://localhost:4000/users/details', {
					headers: {
						Authorization: `Bearer ${data.accessToken}`
					}
				})
				.then(res => res.json())
				.then(data => {
					console.log(data)

					if(data.isAdmin === true){
						localStorage.setItem('isAdmin', data.isAdmin)

						setUser({
							isAdmin: data.isAdmin
						})

						//Push to the /courses
						navigate('/courses')
					}else navigate('/') //If not admin, just redirect to home
				})
			}else {
				Swal.fire({
					title: 'Oops',
					icon: 'error',
					text: 'Wrong Credentials'
				})
			}
			//Clear input
			setEmail('')
			setPassword('')

		})

	//For Local Testing (No Actual Data yet) - We dont need this anymore because we will be using the back end data now (Course Booking app)

		// //Set the email of the authenticated user in the localStorage
		// //SyntaX: localStorage.setItem('propertyName', value)
		// //So that the browser will store the information and won't forget the data
		// localStorage.setItem('email', email);
		// //Set the global user state to have properties obtained from local storage
		// setUser({
		// 	email: localStorage.getItem('email')
		// })


		// //Clear inputs
		// setEmail('');
		// setPassword('');

		// Swal.fire({
		// 	title: 'Sheesh',
		// 	icon: 'success',
		// 	text: `${email} has been verified, Welcome!`
		// })
	}
	return(

	(user.accessToken !== null) ?
		<Navigate to="/courses"/>

		:

		<Form className="registerForm" onSubmit={event => authentication(event)}>
			<h1>Login</h1>
			<Form.Group>
				<Form.Label>Email Address</Form.Label>
				<Form.Control 
					type="email" 
					placeholder="Enter email" 
					value={email} 
					onChange={event => setEmail(event.target.value)}
					required/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control 
					type="password" 
					placeholder="Enter your password" 
					value={password}
					onChange={event => setPassword(event.target.value)} 
					required/>
			</Form.Group>

			{isActive ? 
				<Button variant="dark" type="submit" className="mt-2">Submit</Button>
				: <Button variant="dark" type="submit" className="mt-2" disabled>Submit</Button>}
		</Form>

		)
}