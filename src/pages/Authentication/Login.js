import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'

import Input from '../../components/Input'
import Button from '../../components/Button'

@inject('userStore')
@observer
class Login extends Component {
  render () {
    const {
      userStore: {
        authenticatingUser: { email, password }
      },
      updateField,
      userStore
    } = this.props

    return (
      <Fragment>
        <Input name='email' placeholder='Email' type='email' value={email} onChange={updateField} />
        <Input
          name='password'
          type='password'
          placeholder='Mot de passe'
          value={password}
          onChange={updateField}
        />
        <Button
          value='Se connecter'
          onClick={() => {
            userStore.login({ email, password })
          }}
        />
      </Fragment>
    )
  }
}

export default Login