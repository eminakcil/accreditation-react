import { UserRoleService, UserService } from '@services/index'
import { Card, Table, Tabs } from 'flowbite-react'
import React from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {
  FaReact,
  FaUserCircle,
  FaUserEdit,
  FaUserFriends,
  FaUsers,
  FaUserTie,
} from 'react-icons/fa'
import UsersTable from './UsersTable'

const RoomInformation = () => {
  const [roles, setRoles] = useState(false)
  const [users, setUsers] = useState(false)

  useEffect(() => {
    UserRoleService.getAll().then((response) => {
      setRoles(response)
    })

    UserService.getAll().then((response) => {
      setUsers(response)
    })
  }, [])

  const userByRole = useCallback(
    (roleId) => users.filter((user) => user.userRole._id === roleId),
    [users]
  )

  return (
    <>
      <div>
        <Card>
          <div className="flex flex-col items-center pb-10">
            <img
              className="mb-3 h-36 w-36 rounded-full shadow-lg"
              src="/images/logo.png"
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Ereğli Ticaret ve Sanayi Odası
            </h5>
          </div>
          <div>
            <span className="float-right space-x-2">
              <FaUserEdit className="inline" />
              <span>Yeni Ekle</span>
            </span>
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
    </>
  )
}

export default RoomInformation
