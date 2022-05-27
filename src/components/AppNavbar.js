import { useState } from 'react';
// React Bootstrap Components
import { Navbar, Nav} from 'react-bootstrap';

//React Router
import { Link } from 'react-router-dom';


//Visible in the website is inside return()
export default function AppNavbar(){

	//Store the user information (email) in the state
	//getItem gets the key in the localStorage
	const [ user, setUset ] = useState(localStorage.getItem('email'))
	console.log(user)

	return(
		<Navbar bg="dark" expand="lg" variant="dark" className="mb-5">
			<Navbar.Brand className="ms-3">Zuitt</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav"/>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ms-auto">
					<Nav.Link as={Link} to="/">Home</Nav.Link>
					<Nav.Link as={Link} to="/courses">Courses</Nav.Link>

					{(user !== null) ?
						<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
						:
						<>
							<Nav.Link as={Link} to="/login">Login</Nav.Link>
							<Nav.Link as={Link} to="/register">Register</Nav.Link>
						</>
					}
				</Nav>
			</Navbar.Collapse>
		</Navbar>

		)
}
