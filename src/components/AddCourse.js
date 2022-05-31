import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AddCourse({fetchData}) {

	//Add state for the forms of adding a course
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	//States for opening and closing the modals
	const [ showAdd, setShowAdd ] = useState(false);

	//Function to handle opening and closing of our Modal
	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);

	//Function for adding a course
	const addCourse = (event) => {
		event.preventDefault();

		fetch('http://localhost:4000/courses/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			//If true or success in the backend
			if(data){
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'The Course has been added'
				})

				closeAdd()
				fetchData()
			}else {
				Swal.fire({
					title: 'Something went wrong ..',
					icon: 'error',
					text: 'Please try again'
				})
				fetchData()				
			}

			//Reset all states input
			setName('')
			setDescription('')
			setPrice(0)
		})
	}

	return (
		<>
			<Button variant="primary" onClick={openAdd}>Add Course</Button>


			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={event => addCourse(event)}>
					<Modal.Header closeButton>
						<Modal.Title>Add Course</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control 
							type="text"
							required
							value={name}
							onChange = {event => setName(event.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control 
							type="text"
							required
							value={description}
							onChange = {event => setDescription(event.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control 
							type="number"
							required
							value={price}
							onChange = {event => setPrice(event.target.value)}
							/>
						</Form.Group>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={closeAdd}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>	
				</Form>
			</Modal>
		</>



		)
}