import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/'
import Login from './Login'

test('Login is rendered', () => {

  const { container }  = render(<Login/>)

  const elem = container.querySelector('.logincontent')

  expect(elem).toBeDefined()
})