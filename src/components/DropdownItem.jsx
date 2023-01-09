import { Dropdown } from 'flowbite-react'
import { useLinkClickHandler } from 'react-router-dom'

const DropdownItem = ({ to, children }) => {
  const clickHandler = useLinkClickHandler(to)

  return (
    <span onClick={clickHandler}>
      <Dropdown.Item to={to}>{children}</Dropdown.Item>
    </span>
  )
}
export default DropdownItem
