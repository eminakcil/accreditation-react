import { Card, Tabs } from 'flowbite-react'
import StrategicPlanForm from './components/StrategicPlanForm'
import StrategicSystemForm from './components/StrategicSystemForm'

const StrategicPlanCreate = () => {
  return (
    <Card>
      <Card style={{ backgroundColor: '#F9FCFF' }}>
        <Tabs.Group>
          <Tabs.Item title="Stratejik Plan Ekle">
            <StrategicSystemForm />
          </Tabs.Item>
          <Tabs.Item title="Stratejik Amaç Ekle">
            <StrategicPlanForm />
          </Tabs.Item>
        </Tabs.Group>
      </Card>
    </Card>
  )
}

export default StrategicPlanCreate
