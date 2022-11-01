import { getPath } from '@/utils'
import { Footer as FFooter } from 'flowbite-react'

const Footer = () => {
  return (
    <>
      <FFooter container={true}>
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex xs:items-center xs:justify-between">
            <FFooter.Brand
              href="/"
              src="/images/logo.png"
              alt="Logo"
              name="Ereğli Ticaret ve Sanayi Odası"
            />
            <FFooter.LinkGroup>
              <FFooter.Link href={getPath('strategicPlans')}>Stratejik Plan</FFooter.Link>
              <FFooter.Link href="#">İş Planı</FFooter.Link>
              <FFooter.Link href="#">Akreditasyon</FFooter.Link>
              <FFooter.Link href="#">Anketler</FFooter.Link>
            </FFooter.LinkGroup>
          </div>
          <FFooter.Divider />
          <FFooter.Copyright
            href="#"
            by="Kobizon PDM™"
            year={2022}
          />
        </div>
      </FFooter>
    </>
  )
}

export default Footer
