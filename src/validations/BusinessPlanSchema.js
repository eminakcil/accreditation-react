import Yup from './validation'

export const BusinessPlanShema = Yup.object().shape({
  date: Yup.date().required(),
  time: Yup.string().required(),
  responsible: Yup.string().required(),
  activity: Yup.string(),
  period: Yup.string().required('Tablodan yıl seçmeniz gerekiyor.'),
  title: Yup.string().required(),
  statu: Yup.bool(),
})
