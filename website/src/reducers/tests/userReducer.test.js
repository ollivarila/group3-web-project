import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import userReducer, {
  initializeUser,
  removeUser,
  setUser,
} from '../userReducer'
import '@testing-library/jest-dom'
import StoreTester from './StoreTester'
import Wrapper from './Wrapper'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

describe('userReducer', () => {
  beforeAll(() => {
    const json = JSON.stringify({ id: '123', name: 'mockUser' })
    localStorage.setItem('user', json)
  })

  it('initializes user correctly', async () => {
    let user
    const cb = (st) => {
      user = st.user
    }
    const action = initializeUser()
    render(
      <Wrapper store={store}>
        <StoreTester sendStateToCallback={cb} actionToDispatch={action} />
      </Wrapper>,
    )
    expect(user.id).toBe('123')
    expect(user.name).toBe('mockUser')
  })

  it('sets user correctly', () => {
    const mockUser = {
      name: 'test',
    }
    let user
    const cb = (st) => {
      user = st.user
    }
    const action = setUser(mockUser)
    render(
      <Wrapper store={store}>
        <StoreTester sendStateToCallback={cb} actionToDispatch={action} />
      </Wrapper>,
    )

    expect(user.name).toBe('test')
  })

  it('removes user correctly', () => {
    let user
    const cb = (st) => {
      user = st.user
    }
    const action = removeUser()
    render(
      <Wrapper store={store}>
        <StoreTester sendStateToCallback={cb} actionToDispatch={action} />
      </Wrapper>,
    )

    expect(user).toBe(null)
  })
})
