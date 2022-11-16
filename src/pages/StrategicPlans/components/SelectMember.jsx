import Loading from '@components/Loading'
import { UserRoleService, UserService } from '@services/index'
import { Button, Tabs } from 'flowbite-react'
import { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'

const SelectMember = ({ handleMemberChange = () => {}, selectedUser = false }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [roles, setRoles] = useState(false)
  const [users, setUsers] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true)
    Promise.all([UserRoleService.getAll(), UserService.getAll()])
      .then(([roleResponse, userResponse]) => {
        setRoles(roleResponse)
        setUsers(userResponse)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const userByRole = useCallback(
    (roleId) => users.filter((user) => user.userRole._id === roleId),
    [users]
  )

  if (loading) return <Loading />

  if (error)
    return (
      <>
        Hata <Button onClick={fetchData}>Tekrar Dene</Button>
      </>
    )

  return (
    <Tabs.Group style="underline">
      {roles.map((role) => (
        <Tabs.Item
          key={role._id}
          title={role.title}
        >
          <div className="flex flex-col gap-3">
            {userByRole(role._id).map((user) => (
              <div
                key={user._id}
                className={classNames('p-3 rounded-2xl cursor-pointer select-none', {
                  'bg-gray-100 hover:bg-gray-300 hover:text-gray-700':
                    selectedUser?._id !== user._id,
                  'bg-gray-300 hover:bg-gray-400 hover:text-gray-700':
                    selectedUser?._id === user._id,
                })}
                onClick={() => handleMemberChange(user)}
              >
                {user.fullName}
              </div>
            ))}
          </div>
        </Tabs.Item>
      ))}
    </Tabs.Group>
  )
}

export default SelectMember
