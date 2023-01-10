import LOGO from '@/assets/img/logo-old.png'
// import LOGO from '@/assets/img/ztso-logo.png'

export default {
  LOGO,
  TITLE: 'Ereğli Ticaret ve Sanayi Odası',
  // TITLE: 'Zonguldak Ticaret ve Sanayi Odası',
  IMAGE_PREFIX: import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '',
}
