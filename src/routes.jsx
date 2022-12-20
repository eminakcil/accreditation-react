import { lazy, Suspense } from 'react'
import Loading from './components/Loading'

import PrivateRoute from '@components/PrivateRoute'

const MainLayout = lazy(() => import('./layouts/MainLayout'))

const HomePage = lazy(() => import('./pages/HomePage'))

const StrategicPlanDetail = lazy(() => import('./pages/StrategicPlans/StrategicPlanDetail'))
const StrategicPlanCreate = lazy(() => import('./pages/StrategicPlans/StrategicPlanCreate'))
const StrategicSystem = lazy(() => import('./pages/StrategicPlans/StrategicSystem'))
const StrategicSystemDetail = lazy(() => import('./pages/StrategicPlans/StrategicSystemDetail'))

const RoomInformation = lazy(() => import('./pages/RoomInformation/RoomInformation'))

const Login = lazy(() => import('./pages/Login/Login'))

const NotFound = lazy(() => import('./pages/NotFound'))

const BusinessPlan = lazy(() => import('./pages/BusinessPlans/BusinessPlanCreate'))
const BusinessPlanList = lazy(() => import('./pages/BusinessPlans/BusinessPlanList'))
const BusinessPlanDetail = lazy(() => import('./pages/BusinessPlans/BusinessPlanDetail'))

const Accreditation = lazy(() => import('./pages/Accreditation/Accreditation'))

const Survey = lazy(() => import('./pages/Survey/Survey'))
/** B@type {import('react-router-dom').RouteObject[]} */

const routes = [
  {
    path: 'login',
    name: 'login',
    element: <Login />,
    lazy: true,
  },
  {
    path: 'notFound',
    element: <NotFound />,
    lazy: true,
  },
  {
    path: '/',
    element: <MainLayout />,
    lazy: true,
    children: [
      {
        index: true,
        element: <HomePage />,
        lazy: true,
        auth: true,
      },
      {
        path: 'business-plan',
        name: 'businessPlan',
        children: [
          {
            index: true,
            element: <BusinessPlanList />,
            lazy: true,
            auth: true,
          },
          {
            path: 'create',
            name: 'create',
            lazy: true,
            auth: true,
            element: <BusinessPlan />,
          },
          {
            path: ':id',
            name: 'detail',
            lazy: true,
            auth: true,
            element: <BusinessPlanDetail />,
          },
        ],
      },
      {
        path: 'accreditation',
        name: 'accreditation',
        children: [
          {
            index: true,
            element: <Accreditation />,
            lazy: true,
            auth: true,
          },
        ],
      },
      {
        path: 'survey',
        name: 'survey',
        children: [
          {
            index: true,
            element: <Survey />,
            lazy: true,
            auth: true,
          },
        ],
      },
      {
        path: 'room-informations',
        name: 'roomInformation',
        children: [
          {
            index: true,
            element: <RoomInformation />,
            lazy: true,
            auth: true,
          },
        ],
      },
      {
        path: 'strategic-system',
        name: 'strategicSystem',
        children: [
          {
            index: true,
            element: <StrategicSystem />,
            lazy: true,
            auth: true,
          },
          {
            path: ':strategicSystemId',
            name: 'detail',
            element: <StrategicSystemDetail />,
            lazy: true,
            auth: true,
          },
        ],
      },
      {
        path: 'strategic-plans',
        name: 'strategicPlans',
        children: [
          {
            path: ':strategicPlanId',
            name: 'detail',
            children: [
              {
                index: true,
                element: <StrategicPlanDetail />,
                lazy: true,
                auth: true,
              },
              {
                path: 'goals/:strategicGoalId',
                name: 'goals',
                children: [
                  {
                    index: true,
                    element: <StrategicPlanDetail />,
                    lazy: true,
                    auth: true,
                  },
                  {
                    path: 'activities/:strategicActivityId',
                    name: 'activities',
                    element: <StrategicPlanDetail />,
                    lazy: true,
                    auth: true,
                  },
                ],
              },
            ],
          },
          {
            path: 'create',
            name: 'create',
            element: <StrategicPlanCreate />,
            lazy: true,
            auth: true,
          },
        ],
      },
    ],
  },
]

const mapRoute = (list) => {
  return list.map((item) => {
    if (item?.auth && 'element' in item) {
      item.element = <PrivateRoute>{item.element}</PrivateRoute>
    }

    if (item?.lazy && 'element' in item) {
      item.element = <Suspense fallback={<Loading />}>{item.element}</Suspense>
    }

    // if (item?.wrap && 'element' in item) {
    //   item.element = <Wrapper>{item.element}</Wrapper>
    // }

    // if ('element' in item) {
    //   item.element = <RouteTransition key={index}>{item.element}</RouteTransition>
    // }

    if ('children' in item) {
      item.children = mapRoute(item.children)
    }

    return item
  })
}

const finalRoutes = mapRoute(routes)

export default finalRoutes
