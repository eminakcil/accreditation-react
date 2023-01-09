import constants from '@/constants'
import { getPath } from '@/utils'
import Button from '@components/Button'
import { UserRoleService, UserService } from '@services/index'
import { Card, Tabs } from 'flowbite-react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FaFolderPlus, FaPlus, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const MemberList = () => {
  const [users, setUsers] = useState(false)
  const [roleList, setRoleList] = useState(false)
  const [participantList, setParticipantList] = useState([])

  useEffect(() => {
    Promise.all([UserService.getAll(), UserRoleService.getAll()]).then(
      ([userResponse, roleResponse]) => {
        setUsers(userResponse)
        setRoleList(roleResponse)
      }
    )
  }, [])

  const roleClickHandle = (roleId) => {
    const roleUsers = users.filter((user) => user.userRole._id === roleId)

    const idList = participantList.map((x) => x._id)

    setParticipantList((x) =>
      x.concat(
        ...roleUsers
          .map((user) => {
            if (idList.includes(user._id)) return undefined
            return {
              _id: user._id,
              prefix: user.userRole.title,
              fullName: user.fullName,
              _type: 'user',
            }
          })
          .filter((x) => x)
      )
    )
  }

  const participantRemoveHandle = (id) => {
    setParticipantList((participant) => participant.filter((x) => x._id !== id))
  }

  return (
    <>
      <Tabs.Group
        aria-label="Tabs with underline"
        style="underline"
      >
        {/* <Tabs.Item title="Profile">Profile content</Tabs.Item> */}
        <Tabs.Item
          active={true}
          title="Yeni Katılım Listesi Oluştur"
          icon={FaFolderPlus}
        >
          <div className="flex">
            {roleList &&
              roleList.map((role) => (
                <Button
                  key={role._id}
                  className=" flex color: bg-white text-gray-800 hover:bg-gray-200 hover:text-gray-900"
                  onClick={() => roleClickHandle(role._id)}
                >
                  <FaPlus className="mr-3 h-4 w-4" /> {role.title} Ekle
                </Button>
              ))}
          </div>

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
            <div className="space-y-3">
              {participantList.map((participant, index) => (
                <div
                  key={index}
                  className="p-3 bg-slate-100 rounded-xl flex"
                >
                  {participant.prefix} - {participant.fullName}
                  <button
                    className="ml-auto"
                    onClick={() => participantRemoveHandle(participant._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>
            <div className="items-center">
              <Button
                as={Link}
                to={{
                  pathname: getPath('memberList.create'),
                }}
                className="flex color: bg-white text-gray-800 hover:bg-gray-200 hover:text-gray-900"
              >
                <FaPlus className="mr-3 h-4 w-4" /> Daha Fazla Katılımcı Ekle
              </Button>
            </div>
          </Card>
        </Tabs.Item>
        {/* <Tabs.Item title="Settings">Settings content</Tabs.Item> */}
        {/* <Tabs.Item title="Contacts">Contacts content</Tabs.Item> */}
      </Tabs.Group>
    </>
  )
}

export default MemberList
