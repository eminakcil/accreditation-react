import constants from '@/constants'
import Button from '@components/Button'
import { Card, Label, TextInput } from 'flowbite-react'
import React from 'react'

const ChangePassword = () => {
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
              <div>
                <div className="mb-2 block">
                  <Label value="Mevcut Şifre" />
                </div>
                <TextInput
                  type="password"
                  name="password"
                  placeholder="Mevcut Şifre"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Yeni Şifre" />
                </div>
                <TextInput
                  type="password"
                  placeholder="Yeni Şifre"
                  name="newPassword"
                />
              </div>
              <div></div>
              <Button type="submit">Şifre Değiştir</Button>
            </Card>
          </div>
        </div>
      </Card>
    </>
  )
}

export default ChangePassword
