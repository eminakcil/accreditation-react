import { element } from 'prop-types'
import { lazy, Suspense } from 'react'
import Loading from './components/Loading'

const MainLayout = lazy(() => import('./layouts/MainLayout'))

const HomePage = lazy(() => import('./pages/HomePage'))

const StrategicPlans = lazy(() => import('./pages/StrategicPlans'))
const StrategicPlanDetail = lazy(() => import('./pages/StrategicPlans/StrategicPlanDetail'))
const StrategicPlanCreate = lazy(() => import('./pages/StrategicPlans/StrategicPlanCreate'))

const RoomInformation = lazy(() => import('./pages/RoomInformation/RoomInformation'))

const Login = lazy(() => import('./pages/Login/Login'))

/** @type {import('react-router-dom').RouteObject[]} */

const routes = [
  {
   path: 'login',
   element: <Login />,
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
      },
      {
        path: 'room-informations',
        name: 'roomInformation',
        children: [
          {
            index: true,
            element: <RoomInformation />,
            lazy: true,
          },
        ],
      },
      {
        path: 'strategic-plans',
        name: 'strategicPlans',
        children: [
          {
            index: true,
            element: <StrategicPlans />,
            lazy: true,
          },
          {
            path: ':strategicPlanId',
            name: 'detail',
            children: [
              {
                index: true,
                element: <StrategicPlanDetail />,
                lazy: true,
              },
              {
                path: 'goals/:strategicGoalId',
                name: 'goals',
                children: [
                  {
                    index: true,
                    element: <StrategicPlanDetail />,
                    lazy: true,
                  },
                  {
                    path: 'activities/:strategicActivityId',
                    name: 'activities',
                    element: <StrategicPlanDetail />,
                    lazy: true,
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
          },
        ],
      },
    ],
  },
]

const mapRoute = (list) => {
  return list.map((item) => {
    // if (item?.auth && 'element' in item) {
    //   item.element = <PrivateRoute>{item.element}</PrivateRoute>
    // }

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
