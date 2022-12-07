const mongoose = require('mongoose');
const ShoppingItem = require('../models/ShoppingItem');
const ShoppingList = require('../models/ShoppingList')

const getUserLists = async (req, res) => {
  console.log('getting lists');
  try {
    const userID = req.user.id
    const uLists = await ShoppingList.find({ userID }).sort({ createdAt: -1 })
    res.status(200).send(uLists)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

function makeProducts(list) {
  const itemList = []
  list.forEach(element => {
    console.log(element);

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
  console.log('adding list');
  const { title, comment = '', products } = req.body // body = title, comment(optional), list of item objects
  console.log(title, comment, products);
  const productList = makeProducts(products)
  console.log(productList);
  try {
    const userId = 'string2'
    const shoppingList = await ShoppingList.create({
      title, productList, comment, userId,
    })
    res.status(200).send(shoppingList)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

module.exports = {
  getUserLists,
  addShoppingLists,
}
