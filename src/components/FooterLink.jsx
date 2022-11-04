import { Footer } from 'flowbite-react'
import { useLinkClickHandler } from 'react-router-dom'

const FooterLink = ({ to, children }) => {
  const clickHandler = useLinkClickHandler(to)

  return (
    <span
      onClick={clickHandler}
      className="last:mr-0 md:mr-6"
    >
      <Footer.Link href={to}>{children}</Footer.Link>
    </span>
  )
}
export default FooterLink
