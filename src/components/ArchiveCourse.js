import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2'


export default function ArchiveCourse( {course, isActive, fetchData} ) {


	//For Disabling the course
	const archiveToggle = (courseId) => {
		fetch(`http://localhost:4000/courses/${courseId}/archive`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data){
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Course has been disabled'
				})

				fetchData()
			}else {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Something went wrong ...'
				})

				fetchData()
			}
		})

	}
	//For activating the course
	const activateToggle = (courseId) => {
		fetch(`http://localhost:4000/courses/${courseId}/activate`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data){
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Course has been activated'
				})

				fetchData()
			}else {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Something went wrong ...'
				})

				fetchData()
			}
		})

	}


	return (

		<>
			{isActive ?
				<Button variant="danger" size="sm" onClick={() => archiveToggle(course)}>Disable</Button>
				:
				<Button variant="success" size="sm" onClick={() => activateToggle(course)}>Enable</Button>
			}
			
		</>

		)
}