import Loading from '@components/Loading'
import { UserRoleService, UserService } from '@services/index'
import { Button, Tabs } from 'flowbite-react'
import { useCallback, useEffect, useState } from 'react'

const SelectMember = () => {
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
      <Tabs.Item title="deneme">
        <pre>{JSON.stringify(roles, null, 2)}</pre>
      </Tabs.Item>
    </Tabs.Group>
  )
}

export default SelectMember
