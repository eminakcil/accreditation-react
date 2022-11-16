import { UserShema } from '@/validations/UserSchema'
import Loading from '@components/Loading'
import ErrorMessage from '@components/ErrorMessage'
import { UserService } from '@services/index'
import classNames from 'classnames'
import { Button, Label, Modal, Select, TextInput } from 'flowbite-react'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const UserCreateModal = ({ data: { roles }, show, onClose, onSubmit = () => {} }) => {
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      fullName: '',
      mail: '',
      telephone: '',
      role: '',
    },
    validationSchema: UserShema,
    onSubmit: (values) => {
      setLoading(true)

      UserService.create({
        fullName: values.fullName,
        mail: values.mail,
        telephone: values.telephone,
        userRole: values.role,
      })
        .then((response) => {
          formik.resetForm()
          toast.success('Ekleme Başarılıdır!')
          onSubmit(response)
          onClose()
        })
        .finally(() => setLoading(false))
    },
  })

  useEffect(() => {
    if (roles && formik.values.role.length === 0) {
      formik.setFieldValue('role', roles?.[0]._id)
    }
  }, [roles])

  return (
    <Modal
      show={show}
      onClose={onClose}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="relative">
          {loading && (
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <Loading size={16} />
            </div>
          )}
          <form
            onSubmit={formik.handleSubmit}
            className={classNames({
              'opacity-60': loading,
            })}
          >
            <div className="space-y-3 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900">Üye Ekle</h3>
              <div>
                <div className="mb-2 block">
                  <Label value="Ad Soyad" />
                </div>
                <TextInput
                  placeholder="Ad Soyad"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.fullName && formik.touched.fullName ? (
                  <ErrorMessage>{formik.errors.fullName}</ErrorMessage>
                ) : null}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Mail" />
                </div>
                <TextInput
                  placeholder="Mail"
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
                  <Label value="Telefon" />
                </div>
                <TextInput
                  placeholder="Telefon"
                  name="telephone"
                  value={formik.values.telephone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.telephone && formik.touched.telephone ? (
                  <ErrorMessage>{formik.errors.telephone}</ErrorMessage>
                ) : null}
              </div>
              {roles && (
                <div>
                  <div className="mb-2 block">
                    <Label value="Rol" />
                  </div>
                  <Select
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {roles.map((role) => (
                      <option
                        key={role._id}
                        value={role._id}
                      >
                        {role.title}
                      </option>
                    ))}
                  </Select>
                  {formik.errors.role && formik.touched.role ? (
                    <ErrorMessage>{formik.errors.role}</ErrorMessage>
                  ) : null}
                </div>
              )}
              <div className="w-full">
                <Button
                  gradientDuoTone="cyanToBlue"
                  type="submit"
                >
                  Kaydet
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default UserCreateModal
