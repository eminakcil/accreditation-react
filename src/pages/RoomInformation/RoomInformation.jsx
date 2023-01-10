import constants from '@/constants'
import UserCreateModal from '@pages/RoomInformation/UserCreateModal'
import { UserRoleService, UserService } from '@services/index'
import { Card, Tabs } from 'flowbite-react'
import React from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import UsersTable from './UsersTable'

const RoomInformation = () => {
  const [roles, setRoles] = useState(false)
  const [users, setUsers] = useState(false)

  const [modalOn, setModalOn] = useState(false)
  const [choice, setChoice] = useState(false)

  const clicked = () => {
    setModalOn(true)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    Promise.all([UserRoleService.getAll(), UserService.getAll()]).then(
      ([roleResponse, userResponse]) => {
        setRoles(roleResponse)
        setUsers(userResponse)
      }
    )
  }

  const userByRole = useCallback(
    (roleId) => users.filter((user) => user.userRole._id === roleId),
    [users]
  )

  const handleSubmit = (response) => {
    fetchData()
  }

  return (
    <>
      <div>
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
          </div>
          <div>
            <span className="float-right space-x-2">
              <FaUserEdit className="inline" />
              <button onClick={clicked}>Yeni Ekle</button>
            </span>
            {choice && <div className="flex justify-center">Yesss</div>}
          </div>
          <div className="clear-both"></div>
          {roles && users && (
            <Tabs.Group
              aria-label="Tabs with icons"
              style="underline"
            >
              {roles.map((role) => (
                <Tabs.Item
                  key={role._id}
                  title={role.title}
                >
                  <UsersTable users={userByRole(role._id)} />
                </Tabs.Item>
              ))}
            </Tabs.Group>
          )}
        </Card>
      </div>

      <UserCreateModal
        show={modalOn}
        onClose={() => setModalOn(false)}
        onSubmit={handleSubmit}
        data={{ roles }}
      />
    </>
  )
}

export default RoomInformation
