import constants from '@/constants'
import { getPath } from '@/utils'
import ConfirmSignOutModal from '@components/ConfirmSignOutModal'
import DropdownItem from '@components/DropdownItem'
import NavbarLink from '@components/NavbarLink'
import { useAppSelector } from '@store/index'
import { Dropdown, Navbar as NNavbar } from 'flowbite-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth)

  const signOutPopupRef = useRef()

  const handleSignOut = () => {
    signOutPopupRef.current.setVisibility(true)
  }
  return (
    <>
      <div>
        <NNavbar
          fluid={true}
          rounded={true}
          style={{ backgroundColor: '#F9FCFF' }}
        >
          <NNavbar.Brand href="/">
            <img
              src="/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
          </NNavbar.Brand>
          <NNavbar.Toggle />
          <NNavbar.Collapse>
            <form className="flex items-center">
              <label className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  ></svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  required
                />
              </div>

              <span className="sr-only">Search</span>
            </form>
          </NNavbar.Collapse>
        </NNavbar>
      </div>
      <div>
        <NNavbar
          fluid={true}
          rounded={true}
        >
          <NNavbar.Brand>
            <img
              src={constants.LOGO}
              className="mr-3 h-6 sm:h-9"
              alt="Logo"
            />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              {constants.TITLE}
            </span>
          </NNavbar.Brand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={constants.IMAGE_PREFIX + user.avatar}
                  alt={user.fullName}
                ></img>
              }
            >
              <Dropdown.Header>
                <Link to="/profile">
                  <span className="block text-sm">{user.fullName}</span>
                </Link>
                <Link to="/profile">
                  <span className="block truncate text-sm font-medium">{user.mail}</span>
                </Link>
              </Dropdown.Header>
              <DropdownItem to="/">Ana Sayfa</DropdownItem>
              {/* <Dropdown.Item>Ayarlar</Dropdown.Item> */}
              <DropdownItem to={getPath('changePassword')}>??ifremi De??i??tir</DropdownItem>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>
                <span className="select-none">????k???? Yap</span>
              </Dropdown.Item>
            </Dropdown>
            <NNavbar.Toggle />
          </div>
          <div>
            <NNavbar.Collapse>
              <div className="text-xl">
                <NavbarLink to="/">Ana Sayfa</NavbarLink>
              </div>
              <div className="text-xl">
                <NavbarLink to={getPath('strategicSystem')}>Stratejik Plan</NavbarLink>
              </div>
              <div className="text-xl">
                <NavbarLink to={getPath('businessPlan')}>???? Plan??</NavbarLink>
              </div>
              <div className="text-xl">
                <NavbarLink to={getPath('accreditation')}>Akreditasyon</NavbarLink>
              </div>
              <div className="text-xl">
                <NavbarLink to={getPath('survey')}>Anketler</NavbarLink>
              </div>
              <div className="text-xl">
                <NavbarLink to={getPath('memberList')}>Kat??l??m Listeleri</NavbarLink>
              </div>
            </NNavbar.Collapse>
          </div>
        </NNavbar>
      </div>
      <ConfirmSignOutModal ref={signOutPopupRef} />
    </>
  )
}

export default Navbar
