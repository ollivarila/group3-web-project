import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import {
  setShoppingLists,
  appendShoppingList,
  updateItemInList,
  removeItemFromList,
  removeShoppingList,
  initializeShoppingLists,
  createShoppingList,
  updateItem,
  removeItem,
  createItem,
} from '../shoppingListReducer'
import StoreTester from './StoreTester'
import Wrapper from './Wrapper'
import store from '../../store'
import { initializeUser } from '../userReducer'
import axiosMock from './axiosMock'

describe('shoppingListReducer', () => {
  beforeAll(() => {
    const json = JSON.stringify({ id: '123', name: 'mockUser' })
    localStorage.setItem('user', json)
    store.dispatch(initializeUser())
  })

  beforeEach(() => {
    axiosMock.resetHistory()
    const shoppingList = [
      {
        title: 'first list',
        products: [
          {
            name: 'mockProduct',
            amount: 2,
            id: 'productId',
          },
        ],
        id: 'mockId',
      },
    ]
    store.dispatch(setShoppingLists(shoppingList))
  })

  it('sets shoppinglists', () => {
    let lists
    const cb = (st) => {
      lists = st.shoppingLists
    }
    const action = setShoppingLists({ list: [1, 2, 3] })
    render(
      <Wrapper store={store}>
        <StoreTester sendStateToCallback={cb} actionToDispatch={action} />
      </Wrapper>,
    )

    expect(lists.list[1]).toBe(2)
  })

  it('appends shoppinglists', () => {
    let lists
    const cb = (st) => {
      lists = st.shoppingLists
    }
    const action = appendShoppingList({
      title: 'shoppingList',
      products: [2, 3],
    })
    render(
      <Wrapper store={store}>
        <StoreTester sendStateToCallback={cb} actionToDispatch={action} />
      </Wrapper>,
    )

    expect(lists.length).toBe(2)
    expect(lists[1].title).toBe('shoppingList')
  })

  it('updates item in list', () => {
    let lists
    const cb = (st) => {
      lists = st.shoppingLists
    }

    const action = updateItemInList({
      listId: 'mockId',
      item: {
        name: 'updated',
        id: 'productId',
      },
    })

    render(
      <Wrapper store={store}>
        <StoreTester sendStateToCallback={cb} actionToDispatch={action} />
      </Wrapper>,
    )

    expect(lists.length).toBe(1)
    expect(lists[0].products[0].name).toBe('updated')
  })

  it('removes item from list', () => {
    let lists
    const cb = (st) => {
      lists = st.shoppingLists
    }

    const action = removeItemFromList({
      listId: 'mockId',
      itemId: 'productId',
    })

    render(
      <Wrapper store={store}>
        <StoreTester sendStateToCallback={cb} actionToDispatch={action} />
      </Wrapper>,
    )
    expect(lists.length).toBe(1)
    expect(lists[0].products.length).toBe(0)
  })

  it('removes shoppingList', () => {
    let lists
    const cb = (st) => {
      lists = st.shoppingLists
    }

    const action = removeShoppingList('mockId')

    render(
      <Wrapper store={store}>
        <StoreTester sendStateToCallback={cb} actionToDispatch={action} />
      </Wrapper>,
    )
    expect(lists.length).toBe(0)
  })

  it('initializes shoppinglists', async () => {
    const mockGetState = jest.fn(() => {
      return {
        user: {
          id: 'mockUserId',
        },
      }
    })
    const mockDispatch = jest.fn()
    const action = initializeShoppingLists()
    await action(mockDispatch, mockGetState)
    const { payload } = mockDispatch.mock.lastCall[0]
    expect(payload.length).toBe(1)
    expect(payload[0].title).toBe('mockTitle')
  })

  it('creates shoppinglist', async () => {
    const mockGetState = jest.fn(() => {
      return {
        user: {
          id: 'mockUserId',
        },
      }
    })
    const mockDispatch = jest.fn()
    const action = createShoppingList()
    await action(mockDispatch, mockGetState)
    const { payload } = mockDispatch.mock.lastCall[0]
    expect(payload.id).toBe('id')
    expect(payload.title).toBe('title')
  })

  it('updates item in shopping list', async () => {
    const mockGetState = jest.fn(() => {
      return {
        user: {
          id: 'mockUserId',
        },
      }
    })
    const mockDispatch = jest.fn()
    const item = {
      id: 'mockItemId',
    }

    const action = updateItem('mockListId', item)
    await action(mockDispatch, mockGetState)
    const { payload } = mockDispatch.mock.lastCall[0]
    expect(payload.item.title).toBe('updated')
  })

  it('removes item from shoppinglist', async () => {
    const mockGetState = jest.fn(() => {
      return {
        user: {
          id: 'mockUserId',
        },
      }
    })
    const mockDispatch = jest.fn()
    const action = removeItem('mockListId', 'mockItemId')
    await action(mockDispatch, mockGetState)
    const { payload } = mockDispatch.mock.lastCall[0]
    expect(payload.listId).toBe('mockListId')
    expect(payload.itemId).toBe('mockItemId')
  })

  it('creates item to shoppinglist', async () => {
    const mockDispatch = jest.fn()
    const action = createItem('mockListId', { name: 'item' })
    await action(mockDispatch)
    const { payload } = mockDispatch.mock.lastCall[0]
    expect(payload.item.title).toBe('created')
  })
})
