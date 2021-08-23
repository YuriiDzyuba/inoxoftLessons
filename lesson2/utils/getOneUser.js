const fs = require('fs').promises;

module.exports =async function (path, userId) {
    try {
        const users = await fs.readFile(path)
        const usersObj = JSON.parse(users)
        for (const key in usersObj){
            if (usersObj[key].id===userId){
                return usersObj[key]
            }
        }
    } catch (e) {
        console.log(e, 'read users ERROR')
    }
}