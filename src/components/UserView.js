import { useState, useEffect } from 'react';
import CourseCard from './CourseCard';

export default function UserView({coursesData}){

	const [courses, setCourses] = useState([])

	//We write our .map inside useEffect to render rapid changes of the data
	useEffect(() => {

		const coursesArr = coursesData.map(course => {
			//Only render the active courses
			if(course.isActive){
				return(
					<CourseCard key={course._id} courseProp={course} />
					)
			}else return null
		})

		//Set the courses state to the result of our map function, to bring our return course component outside of the scope of our useEffect where our return statement below can see.

		setCourses(coursesArr)

	}, [coursesData])
	
	return(
		<>
			<h1>User View</h1>
			{ courses }

		</>

		)

}