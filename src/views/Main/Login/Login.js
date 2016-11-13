import React, { PropTypes as T } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class Login extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props
    return (
      <div className={styles.root}>
        <h2 style={{margin: 10 + 'em', marginBottom: 1 + 'em'}}>You need to login with your Google account to access contents of this app</h2>
        <ButtonToolbar className={styles.toolbar}>
          <Button className="btn-lg btn-success" onClick={auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Login;
