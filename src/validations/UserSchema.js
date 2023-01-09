import Yup from './validation'

export const UserShema = Yup.object().shape({
  fullName: Yup.string().required(),
  mail: Yup.string().required(),
  telephone: Yup.string().required(),
  role: Yup.string().required(),
})

export const LoginShema = Yup.object().shape({
  mail: Yup.string().required(),
  password: Yup.string().required(),
})

export const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string().required(),
  newPassword: Yup.string().required(),
})
