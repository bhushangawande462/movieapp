import React, { Suspense } from 'react'
import { Route, Switch } from "react-router-dom"

import Auth from "../hoc/auth"

import NavBar from "./views/NavBar/NavBar"
import Footer from "./views/Footer/Footer"
import LoginPage from "./views/LoginPage/LoginPage"
import MovieDetail from "./views/MovieDetail/MovieDetail"
import LandingPage from "./views/LandingPage/LandingPage"
import FavoritePage from "./views/FavoritePage/FavoritePage"
import NotFoundPage from "./views/RegisterPage/NotFoundPage"
import RegisterPage from "./views/RegisterPage/RegisterPage"

const App = () => {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
          <Route exact path="/favorite" component={Auth(FavoritePage, null)} />
          <Route component={Auth(NotFoundPage, false)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  )
}

export default App