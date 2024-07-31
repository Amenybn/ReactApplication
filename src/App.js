import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import LoginAdmin from './views/pages/login/loginAdmin'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const NotFound = React.lazy(() => import('./layout/pageNotFound/pageNotFound'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const ConfirmSignUp = React.lazy(() => import('./views/pages/register/ConfirmlSignUp'))
const DetailProduct = React.lazy(() => import('./views/pages/login/detailProduct'))
const HomePage = React.lazy(() => import('./views/pages/login/Home'))
const ConfirmReservation = React.lazy(() => import('./views/forms/validation/codeConfirm'))
const AffResUser = React.lazy(() => import('./views/pages/login/affResUser'))
const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/confirmSignUp" name="Register Page" element={<ConfirmSignUp />} />
          <Route exact path="/details" name="Register Page" element={<DetailProduct />} />
          <Route exact path="/home" name="Register Page" element={<HomePage />} />
          <Route
            exact
            path="/confirmReservation"
            name="Confirm Reservation Page"
            element={<ConfirmReservation />}
          />
          <Route
            exact
            path="/AffResUser"
            name="Affichage de reservation"
            element={<AffResUser />}
          />
          <Route
            exact
            path="/ConfirmSignUp"
            name="Confirm SignUp Page"
            element={<ConfirmSignUp />}
          />

          <Route path="*" name="PAge Not Found" element={<NotFound />} />
          <Route path="admin" name="Admin" element={<LoginAdmin />} />
          <Route path="dashboard" name="Admin" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
