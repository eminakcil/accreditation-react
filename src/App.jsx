import { useRoutes } from 'react-router-dom'
import routes from './routes'

import 'normalize.css'
import './style/reset.css'
import './style/index.css'
import { Toaster } from 'react-hot-toast'
import GlobalListeners from '@components/GlobalListeners'

const App = () => {
  return (
    <>
      <GlobalListeners>{useRoutes(routes)}</GlobalListeners>
      <Toaster position="top-right" />
    </>
  )
}
export default App
