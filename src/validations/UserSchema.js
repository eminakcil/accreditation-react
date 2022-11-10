import Yup from './validation'

export const UserShema = Yup.object().shape({
  fullName: Yup.string().required(),
  mail: Yup.string().required(),
  telephone: Yup.string().required(),
  role: Yup.string().required(),
})
