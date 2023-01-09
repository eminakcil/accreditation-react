import constants from '@/constants'
import Button from '@components/Button'
import { Card, Label, Tabs, TextInput } from 'flowbite-react'
import React from 'react'
import { FaUserPlus, FaUserTag } from 'react-icons/fa'

const MemberCreate = () => {
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
          <div className="py-8">
            <Tabs.Group
              aria-label="Tabs with icons"
              style="underline"
            >
              <Tabs.Item
                active={true}
                title="Katılım Üyesi Ol"
                icon={FaUserPlus}
              >
                <div className="py-4">
                  <Card>
                    <div>
                      <div className="mb-2 block">
                        <Label value="İsim Soyisim" />
                      </div>
                      <TextInput
                        type="fullName"
                        name="fullName"
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label value="Mail Adresi" />
                      </div>
                      <TextInput
                        type="email"
                        placeholder="Mail Adresi"
                        name="mail"
                      />
                    </div>
                    <div>
                      <span
                        className="font-medium"
                        style={{ color: 'red' }}
                      >
                        Lütfen!
                      </span>{' '}
                      <span style={{ color: 'grey' }}>
                        Katılım için mail adresinize gelen kodu yetkili ile paylaşınız!
                      </span>
                    </div>
                    <Button type="submit">Kayıt Ol ve Katıl</Button>
                  </Card>
                </div>
              </Tabs.Item>
              <Tabs.Item
                title="Daha Önce Katılım Üyesi Oldum"
                icon={FaUserTag}
              >
                <div className="py-4">
                  <Card>
                    <div>
                      <div className="mb-2 block">
                        <Label value="Mail Adresi" />
                      </div>
                      <TextInput
                        type="email"
                        placeholder="Mail Adresi"
                        name="mail"
                      />
                    </div>
                    <div>
                      <span
                        className="font-medium"
                        style={{ color: 'red' }}
                      >
                        Lütfen!
                      </span>{' '}
                      <span style={{ color: 'grey' }}>
                        Katılım için mail adresinize gelen kodu yetkili ile paylaşınız!
                      </span>
                    </div>
                    <Button type="submit">Katıl</Button>
                  </Card>
                </div>
              </Tabs.Item>
            </Tabs.Group>
          </div>
        </div>
      </Card>
    </>
  )
}

export default MemberCreate
