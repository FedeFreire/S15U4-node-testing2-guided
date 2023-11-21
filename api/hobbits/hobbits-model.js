const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('hobbits')
}

function getById(id) {
  return db('hobbits').where({ id }).first()

}

async function insert(hobbit) {
 await db('hobbits').insert(hobbit)
 return hobbit

}

async function update(id, changes) {
  await db('hobbits').where({ id }).update(changes)
  return getById(id)
}

function remove(id) {
  return db('hobbits').where({ id }).del()
}
