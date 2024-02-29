import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

const NavLinkStyled: React.FC<React.PropsWithChildren & NavLinkProps> = ({ children, ...props }) => {
	return (
		<NavLink {...props} className={({ isActive }) => [isActive && 'border-b-2'].filter(Boolean).join(' ')}>
			{children}
		</NavLink>
	)
}

export default NavLinkStyled
