import { Label, Table, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useMemo, useReducer } from 'react'
import inputListReducer, { initialInputList } from '../../../reducers/inputListReducer'

const RateQuestion = ({
  prefix = '',
  onChange = () => {},
  initialColumns,
  initialRows,
  initialTitle = '',
}) => {
  const [title, setTitle] = useState(initialTitle)
  const [columns, columnsDispatch] = useReducer(
    inputListReducer,
    initialInputList(true, initialColumns)
  )
  const [rows, rowsDispatch] = useReducer(inputListReducer, initialInputList(true, initialRows))

  useEffect(() => {
    onChange({
      type: 'rate',
      title,
      columns,
      rows,
    })
  }, [columns, rows])

  const holes = useMemo(() => {
    return columns.map((column) => (
      <Table.Cell key={column.id}>
        <div className="w-5 h-5 m-auto rounded-full border border-solid border-gray-600"></div>
      </Table.Cell>
    ))
  }, [columns])

  return (
    <>
      <Label value={`${prefix}Derecelendirme soru tipi`} />
      <TextInput
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell></Table.Cell>
            {columns.map((column) => (
              <Table.Cell
                key={column.id}
                className="px-1"
              >
                <TextInput
                  value={column.value}
                  onChange={(e) => {
                    columnsDispatch({ type: 'CHANGE', id: column.id, value: e.target.value })
                  }}
                  onBlur={(e) => {
                    columnsDispatch({ type: 'BLUR', id: column.id, value: e.target.value })
                  }}
                />
              </Table.Cell>
            ))}
          </Table.Row>

          {rows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>
                <TextInput
                  value={row.value}
                  onChange={(e) => {
                    rowsDispatch({ type: 'CHANGE', id: row.id, value: e.target.value })
                  }}
                  onBlur={(e) => {
                    rowsDispatch({ type: 'BLUR', id: row.id, value: e.target.value })
                  }}
                />
              </Table.Cell>
              {holes}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}

export default RateQuestion
