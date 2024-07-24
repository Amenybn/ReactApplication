import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
 
  {
    component: CNavGroup,
    name: 'Reservations',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List of Reservations',
        to: '/base/accordion',
      },
      
    ],
  },
 
  {
    component: CNavGroup,
    name: 'Movies',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List of movies',
        to: '/forms/form-control',
      },
    
      {
        component: CNavItem,
        name: 'Add a Movie',
        to: '/forms/validation',
      },
    ],
  },
 
  {
    component: CNavGroup,
    name: 'Users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      
      {
        component: CNavItem,
        name: 'List of users',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'Add user',
        to: '/icons/brands',
      },
    ],
  },
 
 
]

export default _nav
