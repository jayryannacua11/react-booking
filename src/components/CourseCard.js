import { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
//Import Link to pass the _id prop to SpecificCourse.js
import { Link } from 'react-router-dom';


//Instead of prop, you can destructure it to courseProp so that you can use
// courseProp.name instead of prop.courseProp.name
export default function CourseCard( {courseProp} ){
	//Checks if the data was passed
	//console.log(courseProp)

	//You can destructre it again so that you can just use name instead of courseProp.name
	const { _id, name, description, price } = courseProp;


	//We dont need this anymore because we're using the backend now
		//Use the state hook for this component to be able to store its value
		//states are used to keep track of inofrmation related to individual components
			/*Syntax:
				const [(getter), (setter)] = useState(initialGetterValue) 
					NOTE: getter - currentValue  & setter -updatedValue
				Ex. Below is count = getter and setCount = setter. You can use whatever variable
			*/

			// const [count, setCount] = useState(0);
			// //Set the maximum # of enrollees
			// const [seat, setSeat] = useState(10)

			// //For the enable/disable of enroll button
			// const [isOpen, setIsOpen] = useState(true);

			// //Syntax: useEffect( () => {statement}, [what state to track of useEffect])
			// useEffect( () => {
			// 	if(seat === 0){
			// 		setIsOpen(false)
			// 	}
			// }, [seat])


			// function enroll(){
			// 	if(seat > 0){
			// 		setCount(count + 1);
			// 		console.log('Enrollees: ' + count);
			// 		setSeat(seat - 1);
			// 	}

			// 	//Just trying
			// 	// if(count < seat){
			// 	// 	setCount(count + 1);
			// 	// }else alert("Its already full!")
			// }
	return (

			<Card className="mt-3">
				<Card.Body>
					<Card.Title> { name } </Card.Title>
					<Card.Subtitle>Description:</Card.Subtitle>
					<Card.Text> { description } </Card.Text>
					<Card.Subtitle>Price:</Card.Subtitle>
					<Card.Text>Php { price } </Card.Text>

					<Button variant="dark" as={ Link } to={`/courses/${_id}`}>Details</Button> 			
				</Card.Body>
			</Card>
		)
}

//Check if the CourseCard component is getting the correct prop types
//import PropTypes from 'prop-types'; first at the top of the codeblock
//Proptypes are used for validating information passed to a component and is a tool normally used to help developers ensure the correct information is passed from one component to another

CourseCard.propTypes = {
	courseProp: PropTypes.shape({
		//Define the properties and their expected types
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}