import { Sidebar } from 'flowbite-react'
import { useLinkClickHandler, useLocation } from 'react-router-dom'

const SidebarItem = ({ to, children, icon = false }) => {
  const location = useLocation()
  const clickHandler = useLinkClickHandler(to)

  return (
    <span onClick={clickHandler}>
      <Sidebar.Item
        href={to}
        icon={icon}
        active={location.pathname === to}
      >
        {children}
      </Sidebar.Item>
    </span>
  )
}
export default SidebarItem
