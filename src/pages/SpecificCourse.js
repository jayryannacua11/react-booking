import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Container, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

//useParams() contains any values we are trying to pass in the URL stored
//useParams is how we receive the courseId passed via the URL
import { useParams, Link, useNavigate } from 'react-router-dom';



export default function SpecificCourse() {

	const navigate = useNavigate();

	const { courseId } = useParams();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);


	useEffect( () => {

		fetch(`http://localhost:4000/courses/${ courseId }`)
		.then(res => res.json())
		.then(data => {
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
		})

	}, [])

	const { user } = useContext(UserContext);


	//Put ContentType if there is a body needed in the function (not sure)
	const enroll = (courseId) => {
		fetch('http://localhost:4000/users/enroll', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				courseId: courseId
			})
		})
		.then(res => res.json())
		.then(data => {

			if(data){
				Swal.fire({
					title: 'Successfully Enrolled!',
					icon: 'success',
					text: `You have successfully enrolled for ${name} course`
				})

				navigate('/courses')
			}else {
				Swal.fire({
					title: 'Failed',
					icon: 'error',
					text: 'Something went wrong, please try again ..'
				})
			}
		})
	}

	return(
		<Container>
			<Card>
				<Card.Header>
					<h4>{ name }</h4>
				</Card.Header>

				<Card.Body>
					<Card.Text>{ description }</Card.Text>
					<h6>Price: Php { price } </h6>
				</Card.Body>

				<Card.Footer>
					{ user.accessToken !== null ?
						<Button variant="dark" onClick={() => enroll(courseId)}>Enroll</Button>

						:

						<Button variant="warning" as={Link} to="/login">Login to Enroll</Button>
					}
				</Card.Footer>
			</Card>
		</Container>

		)
}