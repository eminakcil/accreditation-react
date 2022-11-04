import { useRoutes } from 'react-router-dom'
import routes from './routes'

import 'normalize.css'
import './style/reset.css'
import './style/index.css'

const App = () => {
  return <>{useRoutes(routes)}</>
}
export default App
