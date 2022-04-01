const Database = require('./config')

const initDb = {
  async init() {
    const db = await Database()

    await db.exec(`CREATE TABLE urls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT,
      url TEXT
    )`)

    await db.close()
  }
}

initDb.init()
