import classNames from 'classnames'
import { Card } from 'flowbite-react'
import { useMemo, useRef, useState } from 'react'
import StrategicPlanForm from './components/StrategicPlanForm'
import StrategicSystemForm from './components/StrategicSystemForm'

const StrategicPlanCreate = ({ initalTabId = 1 }) => {
  const planRef = useRef(null)

  const handleCreateSystem = (system) => {
    setActiveTabId(2)
    console.log(system)
    setTimeout(() => {
      planRef.current.createAndSelectSystem(system)
    }, 300)
  }
  const tabs = [
    {
      id: 1,
      title: 'Stratejik Plan Ekle',
      element: StrategicSystemForm,
      props: {
        handleCreateSystem,
      },
    },
    {
      id: 2,
      title: 'Stratejik Amaç Ekle',
      element: StrategicPlanForm,
      props: {
        ref: planRef,
      },
    },
  ]

  const [activeTabId, setActiveTabId] = useState(initalTabId)

  const activeTab = useMemo(() => tabs.find((tab) => tab.id === activeTabId), [activeTabId, tabs])

  return (
    <Card>
      <Card style={{ backgroundColor: '#F9FCFF' }}>
        <div className="flex">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={classNames(
                'grid place-items-center',
                'p-4 text-sm font-medium first:ml-0 base active cursor-pointer',
                {
                  'bg-gray-100 text-blue-600': tab.id === activeTabId,
                  'text-gray-500 hover:bg-gray-50 hover:text-gray-600': tab.id !== activeTabId,
                }
              )}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <div>{activeTab && <activeTab.element {...activeTab.props} />}</div>
      </Card>
    </Card>
  )
}

export default StrategicPlanCreate
