import React from 'react'

const Dashboard = React.lazy(() => import('./pages/dashboard/dashboard'))
const About = React.lazy(() => import('./pages/about/about'))
const Home = React.lazy(() => import('./pages/home/home'))
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
]

export default routes
