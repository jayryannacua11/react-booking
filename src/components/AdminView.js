import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import AddCourse from './AddCourse';
import EditCourse from './EditCourse';
import ArchiveCourse from './ArchiveCourse';

export default function AdminView(props){

	console.log(props)
	const { coursesData, fetchData } = props;

	const [ courses, setCourses ] =useState([])

	useEffect( () => {
		const coursesArr = coursesData.map(course => {
			return(
				<tr key={course._id}>
					<td>{course._id}</td>
					<td>{course.name}</td>
					<td>{course.description}</td>
					<td>{parseFloat(course.price).toFixed(2)}</td>
					<td className={course.isActive ? "text-success" : "text-danger"}>
						{course.isActive ? "Available" : "Unavailable"}
					</td>
					<td>
						<EditCourse course={course._id} fetchData={fetchData} />
					</td>
					<td>
						<ArchiveCourse course={course._id} isActive={course.isActive} fetchData={fetchData}/>
					</td>
				</tr>

				)
		})
		setCourses(coursesArr)
	}, [coursesData])
	return(
		<>
			<div className="text-center my-4">
				<h1>Admin Dashboard</h1>
				
			</div>
			<div className="text-end">
				<AddCourse fetchData={fetchData}/>
			</div>

			<Table striped bordered hover responsive className="text-center">
				<thead className="bg-dark text-white">
					<tr>
						<th>ID</th>
						<th>NAME</th>
						<th>DESCRIPTION</th>
						<th>PRICE</th>
						<th>AVAILABILITY</th>
						<th Colspan="2">ACTIONS</th>
					</tr>
				</thead>

				<tbody>
					{courses}
				</tbody>
			</Table>

		</>
		

		)

}