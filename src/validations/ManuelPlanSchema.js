import Yup from './validation'

export const ManuelPlanShema = Yup.object().shape({
  title: Yup.string().required(),
  date: Yup.date().required(),
  time: Yup.string().required(),
  responsible: Yup.string().required(),
  period: Yup.string().required(),
  location: Yup.string(),
  statu: Yup.bool(),
})
