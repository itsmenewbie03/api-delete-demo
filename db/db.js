import { readFileSync, writeFileSync } from 'fs'

const get_db = () => {
    return JSON.parse(readFileSync('./db/db.json'))
}
const update_db = (db) => {
    writeFileSync('./db/db.json', JSON.stringify(db))
}

export { get_db, update_db }
