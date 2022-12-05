import constants from '@/constants'
import { getPath } from '@/utils'
import FooterLink from '@components/FooterLink'
import { Footer as FFooter } from 'flowbite-react'

const Footer = () => {
  return (
    <>
      <FFooter container={true}>
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex xs:items-center xs:justify-between">
            <FFooter.Brand
              href="/"
              src={constants.LOGO}
              alt="Logo"
              name={constants.TITLE}
            />
            <FFooter.LinkGroup>
              <FooterLink to={getPath('strategicSystem')}>Stratejik Plan</FooterLink>
              <FooterLink to="#">İş Planı</FooterLink>
              <FooterLink to="#">Akreditasyon</FooterLink>
              <FooterLink to="#">Anketler</FooterLink>
            </FFooter.LinkGroup>
          </div>
          <FFooter.Divider />
          <div>
            <FFooter.Copyright
              href="#"
              by="Kobizon PDM™"
              year={2022}
            />
          </div>
        </div>
      </FFooter>
    </>
  )
}

export default Footer
