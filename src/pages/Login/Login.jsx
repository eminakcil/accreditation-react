import { LoginShema } from '@/validations/UserSchema'
import ErrorMessage from '@components/ErrorMessage'
import { UserService } from '@services/index'
import { useAppDispatch, useAppSelector } from '@store/index'
import { Button, Card, Footer, Label, TextInput } from 'flowbite-react'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { Navigate, useLocation } from 'react-router-dom'
import { setUser } from '@store/authSlice'
import { getPath } from '@/utils'
import constants from '@/constants'

const Login = () => {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const location = useLocation()

  const formik = useFormik({
    initialValues: {
      mail: '',
      password: '',
    },
    validationSchema: LoginShema,
    onSubmit: (values) => {
      console.log(values)
      UserService.login(values)
        .then((response) => {
          dispatch(setUser(response))
          toast.success('Giriş Başarılı!')
        })
        .catch(({ error }) => {
          switch (error?.message) {
            case 'wrong email':
              toast.error('Hatalı Mail Adresi Girdiniz!')

              break
            case 'wrong password':
              toast.error('Hatalı Şifre Girdiniz!')
              break

            default:
              break
          }
          console.log('catch', error)
        })
        .finally(() => {
          console.log('end')
        })
    },
  })

  if (user) return <Navigate to={location?.state?.returnUrl || getPath('homepage')} />

  return (
    <>
      <div
        className="flex flex-col items-center pb-10 p-11"
        style={{ backgroundColor: '#F9FCFF' }}
      >
        <img
          className="mb-3 h-36 w-36 rounded-full shadow-lg"
          src={constants.LOGO}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white p-2">
          {constants.TITLE}
        </h5>
        <span className="text-m text-gray-500 dark:text-gray-400 p-2">Akreditasyon Sistemi</span>
        <Card style={{ width: '50%' }}>
          <div className="p-2">
            <form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <div className="mb-2 block">
                  <Label value="Mail Adresi" />
                </div>
                <TextInput
                  type="email"
                  placeholder="Mail Adresi"
                  name="mail"
                  value={formik.values.mail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.mail && formik.touched.mail ? (
                  <ErrorMessage>{formik.errors.mail}</ErrorMessage>
                ) : null}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Şifre" />
                </div>
                <TextInput
                  type="password"
                  name="password"
                  placeholder="Şifre"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password ? (
                  <ErrorMessage>{formik.errors.password}</ErrorMessage>
                ) : null}
              </div>

              <Button type="submit">Giriş Yap</Button>
            </form>
          </div>
        </Card>
        <div className="p-6">
          <Footer.Copyright
            href="#"
            by="Kobizon PDM™"
            year={2022}
          />
        </div>
      </div>
    </>
  )
}

export default Login
