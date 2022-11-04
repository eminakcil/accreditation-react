import { Navbar } from 'flowbite-react'
import { useLinkClickHandler, useLocation } from 'react-router-dom'

const NavbarLink = ({ to, children }) => {
  const location = useLocation()
  const clickHandler = useLinkClickHandler(to)

  return (
    <span onClick={clickHandler}>
      <Navbar.Link
        href={to}
        active={location.pathname === to}
      >
        {children}
      </Navbar.Link>
    </span>
  )
}
export default NavbarLink
