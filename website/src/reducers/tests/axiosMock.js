import adapter from 'axios-mock-adapter'
import axios from 'axios'
import { BACKEND_URL } from '../../config'

const axiosMock = new adapter(axios)

const baseurl = BACKEND_URL + '/api/shoppingLists'

axiosMock.onGet(baseurl).reply(200, [
  {
    title: 'mockTitle',
    productList: [
      {
        name: 'mockItem',
        amount: 3,
        id: 'mock',
      },
    ],
    id: 'mockShoppingListId',
  },
])

axiosMock.onPost(baseurl).reply(200, {
  title: 'title',
  id: 'id',
})

axiosMock.onPatch(baseurl + '/mockListId/item/mockItemId').reply(200, {
  title: 'updated',
})

axiosMock.onDelete(baseurl + '/mockListId/item/mockItemId').reply(200, {
  title: 'removed',
})

axiosMock.onPatch(baseurl + '/mockListId/item').reply(200, {
  title: 'created',
})

export default axiosMock
