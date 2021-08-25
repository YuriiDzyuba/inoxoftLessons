const fs = require('fs').promises;

module.exports = async function(path, users) {
    try {
        await fs.writeFile(path, JSON.stringify(users));
        return true;
    } catch (e) {
        console.log(e, 'write users ERROR');
        return false;
    }
};
