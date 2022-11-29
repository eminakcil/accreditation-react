import { signOut } from '@/utils'
import { GeneralService } from '@services/index'
import { useAppSelector } from '@store/index'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Loading from './Loading'

const GlobalListeners = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(user)
    if (user) {
      GeneralService.ping()
        .then(() => {
          console.log('devam no problem')
        })
        .catch((e) => {
          if (e?.message === 'jwt expired') {
            signOut()
            toast('Önce Giriş Yap')
          }
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  if (loading)
    return (
      <div className="w-screen h-screen grid place-items-center">
        <Loading />
      </div>
    )

  return children
}
export default GlobalListeners
