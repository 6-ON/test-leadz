import { Heading } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import NavLinkStyled from '../ui/nav-link'

const Navbar = () => {
	return (
		<div className="flex justify-between items-center bg-blue-600 p-4 sticky top-0 right-0 px-24 backdrop-blur-sm shadow-md z-50">
			<NavLink to="/">
				<Heading fontSize="2xl" fontWeight="bold" color="white">
					BookShop
				</Heading>
			</NavLink>
			<div className="flex gap-5 font-semibold text-white">
				
				<NavLinkStyled to="/books" >Books</NavLinkStyled>
				<NavLinkStyled to="/authors" >Authors</NavLinkStyled>
			</div>
		</div>
	)
}

export default Navbar
