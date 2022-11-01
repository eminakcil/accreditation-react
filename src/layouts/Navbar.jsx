import { getPath } from '@/utils'
import { Avatar, Dropdown, Navbar as NNavbar } from 'flowbite-react'

const Navbar = () => {
  return (
    <>
      <NNavbar
        fluid={true}
        rounded={true}
      >
        <NNavbar.Brand>
          <img
            src="/images/logo.png"
            className="mr-3 h-6 sm:h-9"
            alt="Logo"
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Ereğli Ticaret ve Sanayi Odası
          </span>
        </NNavbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="Kullanıcı"
                img="/images/avatar.png"
                rounded={true}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Damla Akcin</span>
              <span className="block truncate text-sm font-medium">damla@gmail.com</span>
            </Dropdown.Header>
            <Dropdown.Item>Ana Sayfa</Dropdown.Item>
            <Dropdown.Item>Ayarlar</Dropdown.Item>
            <Dropdown.Item>Şifremi Değiştir </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Çıkış Yap</Dropdown.Item>
          </Dropdown>
          <NNavbar.Toggle />
        </div>
        <div>
          <NNavbar.Collapse>
            <div className="text-xl">
              <NNavbar.Link
                href="/"
                active={true}
              >
                Ana Sayfa
              </NNavbar.Link>
            </div>
            <div className="text-xl">
              <NNavbar.Link href={getPath('strategicPlans')}>Stratejik Plan</NNavbar.Link>
            </div>
            <div className="text-xl">
              <NNavbar.Link href="/navbars">İş Planı</NNavbar.Link>
            </div>
            <div className="text-xl">
              <NNavbar.Link href="/navbars">Akreditasyon</NNavbar.Link>
            </div>
            <div className="text-xl">
              <NNavbar.Link href="/navbars">Anketler</NNavbar.Link>
            </div>
          </NNavbar.Collapse>
        </div>
      </NNavbar>
    </>
  )
}

export default Navbar
