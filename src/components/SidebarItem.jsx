import { Sidebar } from 'flowbite-react'
import { useLinkClickHandler, useLocation } from 'react-router-dom'

const SidebarItem = ({ to, children, icon = false, onClick = useLinkClickHandler(to) }) => {
  const location = useLocation()

  return (
    <span onClick={onClick}>
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
