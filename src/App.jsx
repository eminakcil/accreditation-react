import { useRoutes } from 'react-router-dom'
import routes from './routes'

import 'normalize.css'
import './style/reset.css'
import './style/index.css'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      {useRoutes(routes)}
      <Toaster position="top-right" />
    </>
  )
}
export default App
