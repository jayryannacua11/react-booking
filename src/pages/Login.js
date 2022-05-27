import { Form, Button } from 'react-bootstrap';
import { useState, useEffect} from 'react';
import Swal from 'sweetalert2';


export default function Login(){

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

		//Set the email of the authenticated user in the localStorage
		//SyntaX: localStorage.setItem('propertyName', value)
		//So that the browser will store the information and won't forget the data
		localStorage.setItem('email', email);

		setEmail('');
		setPassword('')

		Swal.fire({
			title: 'Sheesh',
			icon: 'success',
			text: `${email} has been verified, Welcome!`
		})
	}
	return(
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