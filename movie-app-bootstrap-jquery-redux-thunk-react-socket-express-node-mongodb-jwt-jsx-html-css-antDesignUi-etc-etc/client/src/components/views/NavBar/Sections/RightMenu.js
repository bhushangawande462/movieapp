import React from 'react'
import axios from 'axios'
import { Menu } from 'antd'
import { useSelector } from "react-redux"
import { withRouter, Link } from 'react-router-dom'

import { USER_SERVER } from '../../../Config'

const RightMenu = props => {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login")
      } else {
        alert('Log Out Failed')
      }
    })
  }

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="favorite">
          <Link to="/favorite">Favorite</Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Link to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">Signup</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <Link to={logoutHandler}>Logout</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu)

