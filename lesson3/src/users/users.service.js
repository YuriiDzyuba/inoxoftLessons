const fs = require('fs').promises;

class UsersService {
    async getUsers(path) {
        try {
            const users = await fs.readFile(path);
            return JSON.parse(users);
        } catch (e) {
            console.log(e, 'read users ERROR');
        }
    }

    async getOneUser(path, userId) {
        try {
            const users = await fs.readFile(path);
            const usersObj = JSON.parse(users);
            for (const key in usersObj) {
                if (usersObj[key].id === userId) {
                    return usersObj[key];
                }
            }
        } catch (e) {
            console.log(e, 'read users ERROR');
        }
    }

    async addUser(path, users) {
        try {
            await fs.writeFile(path, JSON.stringify(users));
            return true;
        } catch (e) {
            console.log(e, 'write users ERROR');
            return false;
        }
    }
}

module.exports = new UsersService();
