import { Button, Card, Footer, Label, TextInput } from 'flowbite-react'
import React from 'react'

const Login = () => {
  return (
    <>
      <div
        className="flex flex-col items-center pb-10 p-11"
        style={{ backgroundColor: '#F9FCFF' }}
      >
        <img
          className="mb-3 h-36 w-36 rounded-full shadow-lg"
          src="/images/logo.png"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white p-2">
          Ereğli Ticaret ve Sanayi Odası
        </h5>
        <span className="text-m text-gray-500 dark:text-gray-400 p-2">Akreditasyon Sistemi</span>
        <Card style={{ width: '50%' }}>
          <div className="p-2">
            <form className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="email"
                    value="Mail Adresi"
                  />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="Mail Adresi"
                  required={true}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="password"
                    value="Şifre"
                  />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  required={true}
                />
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
