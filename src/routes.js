import React from 'react'

const About = React.lazy(() => import('./pages/about/about'))
const Dashboard = React.lazy(() => import('./pages/dashboard/dashboard'))
const Home = React.lazy(() => import('./pages/home/home'))
const Login = React.lazy(() => import('./pages/login/login'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/login', name: 'Login', component: Login },
]

export default routes
