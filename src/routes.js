import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))

//Forms
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))

const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

// Icons
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },

  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },

  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
]

export default routes
