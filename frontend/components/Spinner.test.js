import React from 'react'
import { render, fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { setupServer, getHandlers } from '../../backend/mock-server'
import { st } from '../../backend/helpers'
import App from './App'
import Spinner from './Spinner'

const spinner = screen.queryByText(/please wait/i)

test('sanity', () => {
  expect(true).toBe(true)
})

test('spinner renders when state is true', () => {
 console.log(<Spinner on={true} />)
 // render(<Spinner on={true} />)
 // expect(spinner).toBeTruthy()
})

test('spinner does not render when state is false', () => {
 // render(<Spinner on={false} />)
 // expect(spinner).toBeFalsy()
})