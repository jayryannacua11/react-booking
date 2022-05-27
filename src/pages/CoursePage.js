import CourseCard from '../components/CourseCard';
import coursesData from '../mockData/coursesData';

export default function CoursePage(){
	//Check if the mock data was captured
	//console.log(coursesData);

	console.log(coursesData[0])

	//To display all the courses from the data file we will use map() method
	const courses = coursesData.map(individualCourse => {
		return(
			<CourseCard key={individualCourse.id} courseProp={individualCourse}/>
			//Add key property to keep track the number of courses and to avoid duplication
			)
	})

	return (
		<>
			<h1>Courses</h1>
			{ courses }
		</>

		)
}