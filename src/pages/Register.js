import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Register(){
	//State hooks to store the values of the input fields
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPass, setVerifyPass] = useState('');

	//State for the enable/disable button
	const [isActive, setIsActive] = useState(true)

	useEffect( () => {
		//Validation to enable submit button
		if((email !== '' && password !== '' && verifyPass !== '') && 
			(password === verifyPass)){
			setIsActive(true);
		}else{
			setIsActive(false)
		}
	}, [email, password, verifyPass])

	function registerUser(event) {
		event.preventDefault(); //To prevent redirection/refreshing of page
		//Clear input fields
		setEmail('');
		setPassword('');
		setVerifyPass('');

		Swal.fire({
			title: 'Sheesh',
			icon: 'success',
			text: 'Successfully registered!'
		})
	}

	return(
		<Form className="registerForm" onSubmit={event => registerUser(event)}>
			<h1>Register</h1>
			<Form.Group>
				<Form.Label>Email Address</Form.Label>
				<Form.Control 
					type="email" 
					placeholder="Enter email" 
					value={email} 
					onChange={event => setEmail(event.target.value)}
					required/>
				<Form.Text className="text-muted">We'll never share your email with anyone else</Form.Text>
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

			<Form.Group>
				<Form.Label>Verify Password</Form.Label>
				<Form.Control 
					type="password" 
					placeholder="Verify Password" 
					value={verifyPass}
					onChange={event => setVerifyPass(event.target.value)}  
					required/>
			</Form.Group>

			{isActive ? 
				<Button variant="dark" type="submit" className="mt-2">Submit</Button>
				: <Button variant="dark" type="submit" className="mt-2" disabled>Submit</Button>}
			
			
		</Form>


		) 
}