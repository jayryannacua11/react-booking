import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2'

export default function EditCourse({ course, fetchData }){

	//States for editCourse modal
	const [ showEdit, setShowEdit ] = useState(false)

	//State hook for the course data
	const [courseId, setCourseId] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	//Function openEdit to still get the data to the form while opening the modal
	//courseId is from openEdit(course) <-- you can name whatever you want
	const openEdit = (courseId) => {
		//Get specific course
		fetch(`http://localhost:4000/courses/${courseId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			//Populate all input values with the course information
			setCourseId(data._id)
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
		})

		setShowEdit(true)
	}

	//Function to handle the closing of modal and reset the states back to their default value
	const closeEdit = () => {
		setShowEdit(false)
		//Unecessary reset but just to be sure
		setName('')
		setDescription('')
		setPrice(0)
	}

	//Function to UPDATE or change the specific course
	const editCourse = (event, courseId) => {
		event.preventDefault();

		//Update Specific course
		fetch(`http://localhost:4000/courses/${ courseId }` , {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
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

			//If data from backend returns true (check your backend first if it's returning a boolean)
			if(data){
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Course Successfully updated'
				})
				fetchData()
				closeEdit()
			}else{
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Please try again'
				})

				fetchData()
				closeEdit()
			}
		})
	}


	return(
		<>
			<Button variant="info" size="sm" onClick={() => openEdit(course)}>Update</Button>

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={event => editCourse(event, courseId)}>
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
							      onChange={event => setName(event.target.value)}
							 />
						</Form.Group>

						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control 
							      type="text"
							      required
							      value={description}
							      onChange={event => setDescription(event.target.value)}
							 />
						</Form.Group>

						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control 
							      type="number"
							      required
							      value={price}
							      onChange={event => setPrice(event.target.value)}
							 />
						</Form.Group>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>

				</Form>
			</Modal>

		</>
		

		)
}