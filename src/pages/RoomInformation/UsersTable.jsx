import { Table } from 'flowbite-react'

const UsersTable = ({ users }) => {
  return (
    <Table hoverable={true}>
      <Table.Head>
        <Table.HeadCell>Ad Soyad</Table.HeadCell>
        <Table.HeadCell>Mail</Table.HeadCell>
        <Table.HeadCell>Telefon</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {users.map((user) => (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {user.fullName}
            </Table.Cell>
            <Table.Cell>{user.mail}</Table.Cell>
            <Table.Cell>{user.telephone}</Table.Cell>
            <Table.Cell>
              <a
                href="/tables"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default UsersTable
