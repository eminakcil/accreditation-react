import { useAppSelector } from '../store'
import { Navigate, useLocation } from 'react-router-dom'
import { getPath } from '@/utils'

export default function PrivateRoute({ children }) {
  const location = useLocation()
  const { user } = useAppSelector((state) => state.auth)

  if (!user) {
    return (
      <Navigate
        to={getPath('login')}
        state={{ return_url: location.pathname }}
      />
    )
  }

  return children
}
