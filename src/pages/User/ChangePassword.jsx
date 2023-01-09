import constants from '@/constants'
import { errorInfo, signOut } from '@/utils'
import { ChangePasswordSchema } from '@/validations/UserSchema'
import Button from '@components/Button'
import { UserService } from '@services/index'
import { useAppSelector } from '@store/index'
import { Card, Label, TextInput } from 'flowbite-react'
import { useFormik } from 'formik'
import React from 'react'
import { toast } from 'react-hot-toast'

const ChangePassword = () => {
  const { user } = useAppSelector((state) => state.auth)

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: (values) => {
      UserService.changePassword({
        mail: user.mail,
        password: values.password,
        newPassword: values.newPassword,
      }).then(() => {
        signOut()

        toast.success('Şifreniz Değiştirildi!')
      })
    },
  })

  return (
    <>
      <Card>
        <div className="flex flex-col items-center pb-10">
          <img
            className="mb-3 h-36 w-36 rounded-full shadow-lg"
            src={constants.LOGO}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {constants.TITLE}
          </h5>
          <div className="py-4 w-full max-w-xl">
            <Card>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <div className="mb-2 block">
                    <Label value="Mevcut Şifre" />
                  </div>
                  <TextInput
                    type="password"
                    placeholder="Mevcut Şifre"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {errorInfo(formik, 'password')}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label value="Yeni Şifre" />
                  </div>
                  <TextInput
                    type="password"
                    placeholder="Yeni Şifre"
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {errorInfo(formik, 'newPassword')}
                </div>
                <Button type="submit">Şifre Değiştir</Button>
              </form>
            </Card>
          </div>
        </div>
      </Card>
    </>
  )
}

export default ChangePassword
