import classNames from 'classnames'
import { Table } from 'flowbite-react'
import { useState } from 'react'

const Collapsable = ({ item }) => {
  const [active, setActive] = useState(false)

  const colors = ['#C8D7E6', '#E4EAF1', '#F5F9FC', '#FAFCFF']

  const indent = item.indent % colors.length

  const toggleActivity = () => {
    setActive((x) => !x)
  }

  return (
    <>
      <div
        onClick={toggleActivity}
        style={{ backgroundColor: colors[indent] }}
        className="text-gray-900 p-3 rounded-lg space-y-3 grid py-4"
      >
        <span className="flex-1">
          {item.no} {item.name}
        </span>
        <span></span>
        <span className="flex text-cyan-700 justify-start">{item.extras}</span>
        {'proofList' in item && (
          <Table>
            <Table.Head>
              <Table.Cell>Başlık</Table.Cell>
              <Table.Cell>Dosya</Table.Cell>
            </Table.Head>
            <Table.Body>
              {item.proofList?.map((proof, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{proof.title}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>

      {'children' in item && (
        <div
          className={classNames('space-y-3', {
            hidden: !active,
          })}
        >
          {item?.children?.map((item, index) => (
            <Collapsable
              key={index}
              item={item}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default Collapsable
