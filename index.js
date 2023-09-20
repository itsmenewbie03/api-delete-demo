import express from 'express'
import { get_files, delete_file, read_file } from './utils/handler.js';
import { get_db, update_db } from './db/db.js';
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (_, res) => {
    return res.send('Hello👋🏻');
});

app.get('/read', (req, res) => {
    const { file } = req.query;
    if (!file) {
        return res.status(400).send('Missing required param: file!');
    }
    const data = read_file(file)
    if (!data) {
        return res.status(400).send('Failed to read file content!')
    }
    return res.send(data)
})

app.get('/files', (_, res) => {
    const files = get_files()
    let files_html = ``
    files.forEach(e => {
        files_html += `<li>${e}</li>`;
    })
    let html = `<ul>${files_html}<ul/>`
    return res.send(html);
})

// THIS IS THE ONLY THING THAT MATTERS
app.delete('/delete', (req, res) => {
    console.log(req.query)
    const { file } = req.query;
    if (!file) {
        return res.status(400).json({ message: 'Missing required param: file!' });
    }
    const success = delete_file(file)
    const code = success ? 200 : 404
    const msg = success ? `Deleted ${file} successfully.` : `Failed to delete ${file}`
    return res.status(code).json({ message: msg })
})
app.delete('/json_delete/object', (req, res) => {
    const db = get_db()
    const { id } = req.query;
    const index = db["students"].findIndex(e => e.id == id)
    if (index == -1) {
        return res.status(404).json({ "message": "No match for the id" });
    }
    db["students"].splice(index, 1);
    update_db(db);
    return res.status(200).json(get_db());
})
app.delete('/json_delete/prop', (req, res) => {
    const db = get_db()
    const { id, prop } = req.query;
    const index = db["students"].findIndex(e => e.id == id)
    if (index == -1) {
        return res.status(404).json({ "message": "No match for the id" });
    }
    delete db["students"][index][prop]
    update_db(db);
    return res.status(200).json(get_db());
})

app.get('/json_read', (_, res) => {
    return res.json(get_db());
})
app.listen(PORT, () => {
    console.log(`App is alive at http://localhost:${PORT}`);
})
// Done I Guess?
// HAHAHAHA