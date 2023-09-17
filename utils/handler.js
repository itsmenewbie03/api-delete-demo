import { readdirSync, unlinkSync, lstatSync, readFileSync } from 'fs';
const get_files = () => {
    const files = readdirSync('./public')
    return files
}

const delete_file = (filename) => {
    const fname = `./public/${filename}`

    // simple security
    try {
        if (lstatSync(fname).isDirectory()) {
            // prevent directory delete
            console.log('No No No!')
            return false
        }
    } catch (err) {
        console.log(err);
        return false
    }

    // THE DELETION PART!!!
    try {
        unlinkSync(fname);
        console.log(`${fname} is deleted successfully!`)
        return true
    }
    catch (err) {
        console.log(`Failed to delete ${fname}\n${err.message}`)
        return false
    }
}

const read_file = (filename) => {
    const fname = `./public/${filename}`
    try {
        if (lstatSync(fname).isDirectory()) {
            // prevent directory delete
            console.log('No No No!')
            return false
        }
        return readFileSync(fname).toString()
    } catch (err) {
        return false
    }
}
export { get_files, delete_file, read_file }