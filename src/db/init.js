const Database = require('./config')

const initDb = {
  async init() {
    const db = await Database()
    



    await db.close()
  }
}

initDb.init()
