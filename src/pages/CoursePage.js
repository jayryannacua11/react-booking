// import CourseCard from '../components/CourseCard';
// import coursesData from '../mockData/coursesData';

import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

import { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';

export default function CoursePage(){

	//MockData (Dont need this anymore)
		// //Check if the mock data was captured
		// //console.log(coursesData);

		// console.log(coursesData[0])

		// //To display all the courses from the data file we will use map() method
		// const courses = coursesData.map(individualCourse => {
		// 	return(
		// 		<CourseCard key={individualCourse.id} courseProp={individualCourse}/>
		// 		//Add key property to keep track the number of courses and to avoid duplication
		// 		)
		// })

	const [ allCourses, setAllCourses] = useState([])

	const fetchData = () => {
		fetch('http://localhost:4000/courses/all')
		.then(res => res.json())
		.then(data => {
			console.log(data)

			//Storing all the data to our useState
			setAllCourses(data)
		})
		
	}

	//It renders the function fetchData() -> It gets the updated data coming from fetch
	useEffect(() => {
		fetchData()
	}, [])
	//If the useEffect has no variables, it will only render one time.

	const { user } = useContext(UserContext);

	return (
		/*<>
			<h1>Courses</h1>
			{ courses }
		</>*/

		<>
			<h1>Courses</h1>

			{(user.isAdmin === true) ?

				<AdminView coursesData={allCourses} fetchData={fetchData}/>

				:

				<UserView coursesData={allCourses} />
			}
		</>

		)
}