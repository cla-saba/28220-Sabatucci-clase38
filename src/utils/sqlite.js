const path = require('path')

const optionSqlite = {
  client: 'better-sqlite3',
  connection: { filename: path.resolve(__dirname, '../db/mensajes.db3') },
  useNullAsDefault: true
}

module.exports = { optionSqlite }