const mongoose = require('mongoose');
const ShoppingItem = require('../models/ShoppingItem');
const ShoppingList = require('../models/ShoppingList')

const verifyOwnership = (ownerId, userId) => {
  return ownerId.toString() === userId.toString()
}

const getUserLists = async (req, res) => {
  try {
    const uLists = await ShoppingList.find({ owner: req.id }).sort({ createdAt: -1 })
    if (uLists.length === 0) {
      return res.status(400).send({ error: 'no lists found for you' })
    }
    res.status(200).send(uLists)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const getListbyId = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "id didn't match" })
  }
  const list = await ShoppingList.findById(id)
  if (!verifyOwnership(list.owner, req.id)) {
    return res.status(400).send({ error: "you can't access this list" })
  }

  if (!list) {
    return res.status(404).json({ error: 'No list found' })
  }
  res.status(200).send(list)
}

function makeProducts(list) {
  const itemList = []
  list.forEach(element => {
    itemList.push(new ShoppingItem({
      name: element.name,
      amount: element.amount,
      unit: element.unit,
      comment: element.comment,
    }))
  });
  return itemList
}

const addShoppingLists = async (req, res) => {
  const { title, comment = '', products } = req.body // body = title, comment(optional), list of item objects
  const productList = makeProducts(products)
  try {
    const shoppingList = await ShoppingList.create({
      title, productList, comment, owner: req.id,
    })
    res.status(200).send(shoppingList)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const deleteShoppingList = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "id didn't match" })
  }
  const list = await ShoppingList.findById(id)

  if (!verifyOwnership(list.owner, req.id)) {
    return res.status(400).send({ error: "you can't delete this list" })
  }

  if (!list) {
    return res.status(404).json({ error: 'No list found' })
  }
  await list.remove()
  res.status(200).send(list)
}

const updateShoppingList = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No list for this id found' })
  }
  const { title, comment = '', products } = req.body // body = title, comment(optional), list of item objects
  const productList = makeProducts(products)
  try {
    const shoppingList = await ShoppingList.findById(id)
    if (!shoppingList) {
      return res.status(400).send({ error: 'no find list' })
    }
    if (!verifyOwnership(shoppingList.owner, req.id)) {
      return res.status(400).send({ error: "You can't modify this list" })
    }
    const updated = await ShoppingList.findByIdAndUpdate(
      shoppingList._id,
      { title, productList, comment },
      { new: true },
    )
    res.status(200).send(updated)
  } catch (error) {
    console.error(error)
    res.status(400).send({ error: error.message })
  }
}

const getAll = async (req, res) => {
  try {
    const uLists = await ShoppingList.find({ owner: req.id })
    if (uLists.length === 0) {
      return res.status(400).send({ error: 'no lists found for you' })
    }
    res.status(200).json(uLists)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const formatDb = async (req, res) => {
  await ShoppingList.deleteMany({})
  await ShoppingItem.deleteMany({})
  res.status(204).end()
}

module.exports = {
  getUserLists,
  addShoppingLists,
  deleteShoppingList,
  getListbyId,
  updateShoppingList,
  getAll,
  formatDb,
}
