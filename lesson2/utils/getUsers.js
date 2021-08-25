const fs = require('fs').promises;

module.exports = async function(path) {
    try {
        const users = await fs.readFile(path);
        return JSON.parse(users);
    } catch (e) {
        console.log(e, 'read users ERROR');
    }
};
