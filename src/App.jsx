import { useRoutes } from 'react-router-dom'
import routes from './routes'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import 'normalize.css'
import './style/reset.css'
import './style/index.css'

const App = () => {
  return (
    <>
      {useRoutes(routes)}
      <ToastContainer />
    </>
  )
}
export default App
